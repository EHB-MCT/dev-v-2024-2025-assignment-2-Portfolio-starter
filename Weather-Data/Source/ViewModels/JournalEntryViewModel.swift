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
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.faceTrackingViewModel.stopTracking()
            
            guard let self = self, !self.journalText.isEmpty else { return }
            
            let emotionData = self.faceTrackingViewModel.getCurrentEmotionData()
            let sessionMood = self.faceTrackingViewModel.sessionMood
            
            let entry = JournalEntry(
                id: UUID().uuidString,
                text: journalText,
                timestamp: Date(),
                emotionData: emotionData,
                sessionMood: sessionMood
            )
            
            self.firebaseService.save(entry: entry) { success in
                if success {
                    self.journalText = ""
                } else {
                    print("Failed to save entry.")
                }
            }
        }
    }
}
