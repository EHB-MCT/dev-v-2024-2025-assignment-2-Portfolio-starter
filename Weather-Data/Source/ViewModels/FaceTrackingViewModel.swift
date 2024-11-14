//
//  FaceTrackingViewModel.swift
//  
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import ARKit
import Combine

/// A view model responsible for managing ARKit-based face tracking and updating emotion data.
/// `FaceTrackingViewModel` uses ARKit's `ARSession` and `ARFaceAnchor` to track facial expressions
/// and update emotion data in real-time, which is then analyzed by `EmotionAnalysisService`.
/// It also provides a `sessionMood` at the end of each tracking session.
class FaceTrackingViewModel: NSObject, ObservableObject, ARSessionDelegate {
    
    /// The AR session responsible for managing face tracking.
    private var session = ARSession()
    
    /// A shared instance of `EmotionAnalysisService` used to analyze and store emotion data.
    private let emotionAnalysisService = EmotionAnalysisService.shared
    
    /// The current emotion data being tracked, published to update any observing views.
    @Published var currentEmotionData = EmotionData(smile: 0.0, frown: 0.0, raisedEyebrow: 0.0, jawOpen: 0.0)
    
    /// A string representing the overall mood of the session, determined at the end of tracking.
    @Published var sessionMood: String = ""
    
    /// Starts face tracking if the device supports AR face tracking.
    /// Configures the `ARSession` with `ARFaceTrackingConfiguration` and begins the session.
    func startTracking() {
        guard ARFaceTrackingConfiguration.isSupported else {
            print("AR Face Tracking is not supported on this device.")
            return
        }
        let configuration = ARFaceTrackingConfiguration()
        session.delegate = self
        session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
    }

    /// Stops face tracking and performs final mood analysis.
    /// Pauses the `ARSession`, updates `sessionMood` with the analyzed final emotion, and resets the data.
    func stopTracking() {
        session.pause()
        
        sessionMood = emotionAnalysisService.getFinalEmotion()
        print("Session mood before reset: \(sessionMood)")

        emotionAnalysisService.resetData()
    }

    /// Returns the current `EmotionData`.
    /// - Returns: The most recent `EmotionData` representing the current tracked facial expression metrics.
    func getCurrentEmotionData() -> EmotionData {
        print(currentEmotionData)
        return currentEmotionData
    }

    /// Called when ARKit updates the session with new anchor data.
    /// This method extracts emotion metrics from `ARFaceAnchor` blend shapes and updates `currentEmotionData`.
    /// It adds the latest `EmotionData` to `EmotionAnalysisService` for further analysis.
    ///
    /// - Parameters:
    ///   - session: The `ARSession` providing the update.
    ///   - anchors: The list of anchors in the session; this method specifically processes `ARFaceAnchor` for face tracking.
    func session(_ session: ARSession, didUpdate anchors: [ARAnchor]) {
        for anchor in anchors {
            guard let faceAnchor = anchor as? ARFaceAnchor else { continue }

            let smile = Double(faceAnchor.blendShapes[.mouthSmileLeft]?.floatValue ?? 0)
            let frown = Double(faceAnchor.blendShapes[.mouthFrownLeft]?.floatValue ?? 0)
            let raisedEyebrow = Double(faceAnchor.blendShapes[.browInnerUp]?.floatValue ?? 0)
            let jawOpen = Double(faceAnchor.blendShapes[.jawOpen]?.floatValue ?? 0)
            
            if !smile.isNaN, !frown.isNaN, !raisedEyebrow.isNaN, !jawOpen.isNaN {
                currentEmotionData = EmotionData(
                    smile: smile,
                    frown: frown,
                    raisedEyebrow: raisedEyebrow,
                    jawOpen: jawOpen
                )
                emotionAnalysisService.addEmotionData(currentEmotionData)
            } else {
                print("Warning: Received NaN values in blend shapes.")
            }
        }
    }
}
