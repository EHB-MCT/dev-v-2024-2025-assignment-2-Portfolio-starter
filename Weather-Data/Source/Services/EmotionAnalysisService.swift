//
//  EmotionAnalysisService.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Foundation

class EmotionAnalysisService {
    private var emotionDataList: [EmotionData] = []

    func addEmotionData(_ data: EmotionData) {
        emotionDataList.append(data)
    }

    func calculateAverageEmotion() -> String {
        guard !emotionDataList.isEmpty else { return "Neutral" }

        let totalSmile = emotionDataList.reduce(0) { $0 + $1.smile }
        let totalFrown = emotionDataList.reduce(0) { $0 + $1.frown }
        let totalEyebrowRaise = emotionDataList.reduce(0) { $0 + $1.raisedEyebrow }
        let totalJawOpen = emotionDataList.reduce(0) { $0 + $1.jawOpen }

        let count = Float(emotionDataList.count)

        let averageSmile = totalSmile / count
        let averageFrown = totalFrown / count
        let averageEyebrowRaise = totalEyebrowRaise / count
        let averageJawOpen = totalJawOpen / count

        print("Average Smile: \(averageSmile), Average Frown: \(averageFrown), Average Eyebrow Raise: \(averageEyebrowRaise), Average Jaw Open: \(averageJawOpen)")

        if averageSmile > 0.5 {
            return "Happy"
        } else if averageFrown > 0.5 {
            return "Sad"
        } else if averageEyebrowRaise > 0.5 {
            return "Surprised"
        } else if averageJawOpen > 0.5 {
            return "Excited"
        } else {
            return "Neutral"
        }
    }

    func resetData() {
        emotionDataList.removeAll()
    }
}
