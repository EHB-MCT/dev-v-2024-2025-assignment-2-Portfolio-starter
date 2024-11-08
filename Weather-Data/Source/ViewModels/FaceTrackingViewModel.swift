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
        private let emotionAnalysisService = EmotionAnalysisService()
        @Published var currentEmotionData = EmotionData()
        @Published var sessionMood: String = ""

        func startTracking() {
            guard ARFaceTrackingConfiguration.isSupported else { return }
            let configuration = ARFaceTrackingConfiguration()
            session.delegate = self
            session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
        }

        func stopTracking() {
            session.pause()
            sessionMood = emotionAnalysisService.calculateAverageEmotion()
            emotionAnalysisService.resetData()
        }
    
    func getCurrentEmotionData() -> EmotionData {
        return currentEmotionData
    }
    
    func session(_ session: ARSession, didUpdate anchors: [ARAnchor]) {
        for anchor in anchors {
            guard let faceAnchor = anchor as? ARFaceAnchor else { continue }
            
            // Create an EmotionData instance with valid, non-NaN values
            let smile = faceAnchor.blendShapes[.mouthSmileLeft]?.floatValue ?? 0
            let frown = faceAnchor.blendShapes[.mouthFrownLeft]?.floatValue ?? 0
            let raisedEyebrow = faceAnchor.blendShapes[.browInnerUp]?.floatValue ?? 0
            let jawOpen = faceAnchor.blendShapes[.jawOpen]?.floatValue ?? 0

            // Ensure values are valid numbers
            if !smile.isNaN, !frown.isNaN, !raisedEyebrow.isNaN, !jawOpen.isNaN {
                currentEmotionData = EmotionData(
                    smile: smile,
                    frown: frown,
                    raisedEyebrow: raisedEyebrow,
                    jawOpen: jawOpen
                )
                emotionAnalysisService.addEmotionData(currentEmotionData)
            }
        }
    }
}
