//
//  EmotionAnalysisService.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Foundation

class EmotionAnalysisService {
    static let shared = EmotionAnalysisService()
    
    private var emotionDataList: [EmotionData] = []
    private let instanceId = UUID()
    
    private init() {  
        print("EmotionAnalysisService singleton instance created with ID: \(instanceId)")
    }
    
    func addEmotionData(_ data: EmotionData) {
        emotionDataList.append(data)
    }

    func getFinalEmotion() -> String {
        print("Getting final emotion from instance ID: \(instanceId)")
        guard let finalEmotion = emotionDataList.last else {
            print("No emotion data found")
            return "Neutral"
        }

        print("Final EmotionData: \(finalEmotion)")

        if finalEmotion.smile > 0.5 {
            return "Happy"
        } else if finalEmotion.frown > 0.5 {
            return "Sad"
        } else if finalEmotion.raisedEyebrow > 0.5 {
            return "Surprised"
        } else if finalEmotion.jawOpen > 0.5 {
            return "Excited"
        } else {
            return "Neutral"
        }
    }

    func resetData() {
        print("Resetting emotion data for instance ID: \(instanceId)")
        emotionDataList.removeAll()
    }
}
