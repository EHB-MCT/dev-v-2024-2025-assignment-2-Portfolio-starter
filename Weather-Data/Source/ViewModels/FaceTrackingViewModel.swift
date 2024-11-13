//
//  FaceTrackingViewModel.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import ARKit
import Combine

class FaceTrackingViewModel: NSObject, ObservableObject, ARSessionDelegate {
    private var session = ARSession()
    private let emotionAnalysisService = EmotionAnalysisService.shared  
    @Published var currentEmotionData = EmotionData(smile: 0.0, frown: 0.0, raisedEyebrow: 0.0, jawOpen: 0.0)
    @Published var sessionMood: String = ""

    func startTracking() {
        guard ARFaceTrackingConfiguration.isSupported else {
            print("AR Face Tracking is not supported on this device.")
            return
        }
        let configuration = ARFaceTrackingConfiguration()
        session.delegate = self
        session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
    }

    func stopTracking() {
        session.pause()
        
        sessionMood = emotionAnalysisService.getFinalEmotion()
        print("Session mood before reset: \(sessionMood)")

        emotionAnalysisService.resetData()
        
    }

    func getCurrentEmotionData() -> EmotionData {
        print(currentEmotionData)
        return currentEmotionData
    }

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
