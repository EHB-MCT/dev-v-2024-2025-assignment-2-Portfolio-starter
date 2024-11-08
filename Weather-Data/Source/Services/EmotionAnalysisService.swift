//
//  EmotionAnalysisService.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import Foundation
import Combine

class EmotionAnalysisService {
    private var emotionDataList: [EmotionData] = []
    
    // Add current emotion data to the list (called from ARKit session)
    func addEmotionData(_ data: EmotionData) {
        emotionDataList.append(data)
    }
    
    // Calculate average scores over time to determine the overall mood
    func calculateAverageEmotion() -> String {
        var totalScores: [String: Float] = ["happiness": 0, "sadness": 0, "surprise": 0]
        let dataCount = Float(emotionDataList.count)

        for data in emotionDataList {
            let scores = data.emotionScores
            totalScores["happiness"]? += scores["happiness"] ?? 0
            totalScores["sadness"]? += scores["sadness"] ?? 0
            totalScores["surprise"]? += scores["surprise"] ?? 0
        }

        // Calculate average for each emotion score
        totalScores = totalScores.mapValues { $0 / dataCount }

        // Determine the dominant mood
        let dominantEmotion = totalScores.max(by: { $0.value < $1.value })?.key ?? "neutral"
        return dominantEmotion
    }
    
    // Reset data (optional, for when the session ends)
    func resetData() {
        emotionDataList.removeAll()
    }
}