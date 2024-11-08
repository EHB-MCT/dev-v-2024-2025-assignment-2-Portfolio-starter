//
//  JournalEntryViewModel.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import SwiftUI
import Combine

class JournalEntryViewModel: ObservableObject {
    @Published var journalText = ""
    private let firebaseService = FirebaseService()
    private let faceTrackingViewModel = FaceTrackingViewModel()

    func saveJournalEntry() {
        guard !journalText.isEmpty else { return }
        
        // Get the current emotion data and session mood from FaceTrackingViewModel
        let emotionData = faceTrackingViewModel.getCurrentEmotionData()
        let sessionMood = faceTrackingViewModel.sessionMood  // Access the session mood
        
        let entry = JournalEntry(
            id: UUID().uuidString,
            text: journalText,
            timestamp: Date(),
            emotionData: emotionData,
            sessionMood: sessionMood  // Include the mood in the journal entry
        )
        
        firebaseService.save(entry: entry) { success in
            if success {
                self.journalText = ""
            } else {
                print("Failed to save entry.")
            }
        }
    }
}
