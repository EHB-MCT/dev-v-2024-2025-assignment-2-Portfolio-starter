//
//  EmotionAnalysisService.swift
//   
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Foundation

/// A singleton service responsible for managing and analyzing emotion data.
/// The `EmotionAnalysisService` class provides methods to add emotion data,
/// retrieve the final emotion based on recorded data, and reset the emotion data list.
class EmotionAnalysisService {
    
    /// The shared instance of `EmotionAnalysisService` to ensure only one instance
    /// is created and accessed globally across the app.
    static let shared = EmotionAnalysisService()
    
    /// Stores a list of emotion data entries.
    private var emotionDataList: [EmotionData] = []
    
    /// Unique identifier for this instance, used for logging and debugging purposes.
    private let instanceId = UUID()
    
    /// Private initializer to prevent instantiation from other parts of the app,
    /// ensuring `EmotionAnalysisService` remains a singleton.
    private init() {
        print("EmotionAnalysisService singleton instance created with ID: \(instanceId)")
    }
    
    /// Adds a new `EmotionData` entry to the list.
    /// - Parameter data: The `EmotionData` object representing a single emotion data point.
    func addEmotionData(_ data: EmotionData) {
        emotionDataList.append(data)
    }

    /// Retrieves the final emotion based on the last entry in the emotion data list.
    /// - Returns: A `String` describing the interpreted emotion (e.g., "Happy", "Sad", "Surprised", "Excited", or "Neutral").
    ///            If no data exists, it returns "Neutral" by default.
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

    /// Resets the emotion data list by clearing all recorded entries.
    /// This method can be called to start a new session without retaining past data.
    func resetData() {
        print("Resetting emotion data for instance ID: \(instanceId)")
        emotionDataList.removeAll()
    }
}
