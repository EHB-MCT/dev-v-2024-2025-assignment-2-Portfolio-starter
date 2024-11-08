//
//  EmotionData.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import Foundation

struct EmotionData {
    var smile: Float = 0
    var frown: Float = 0
    var raisedEyebrow: Float = 0
    var jawOpen: Float = 0

    // Aggregate expressions into "emotion" scores
    var emotionScores: [String: Float] {
        [
            "happiness": smile,
            "sadness": frown,
            "surprise": raisedEyebrow + jawOpen
        ]
    }

    // Determine dominant emotion by finding the max score
    var dominantEmotion: String {
        let sortedScores = emotionScores.sorted { $0.value > $1.value }
        return sortedScores.first?.key ?? "neutral"
    }
}