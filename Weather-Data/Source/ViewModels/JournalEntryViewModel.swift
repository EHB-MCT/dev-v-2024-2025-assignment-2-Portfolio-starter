//
//  JournalEntryViewModel.swift
//  
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import SwiftUI
import Combine

/// A view model responsible for managing the journal entry input and saving process.
/// `JournalEntryViewModel` integrates face tracking data from `FaceTrackingViewModel`
/// and saves entries to Firebase using `FirebaseService`.
class JournalEntryViewModel: ObservableObject {
    
    /// The text content of the journal entry entered by the user.
    @Published var journalText = ""
    
    /// The title of the journal entry entered by the user.
    @Published var journalTitle = ""
        
    /// The selected topic for the journal entry.
    @Published var selectedTopic: String = "Friends"
    
    /// A service instance responsible for saving journal entries to Firebase.
    private let firebaseService = FirebaseService()
    
    /// An instance of `FaceTrackingViewModel` used to track and analyze the user’s facial expressions
    /// during the journal entry session.
    private let faceTrackingViewModel = FaceTrackingViewModel()

    /// Saves the current journal entry to Firebase.
    ///
    /// This method stops face tracking, retrieves the current `EmotionData` and `sessionMood`,
    /// and constructs a `JournalEntry` with this information. The entry is then saved using
    /// `FirebaseService`. If the save operation succeeds, `journalText` is cleared.
    ///
    /// - Important: This method only saves the entry if `journalText` is not empty.
    func saveJournalEntry() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            self?.faceTrackingViewModel.stopTracking()
            
            guard let self = self,
                !self.journalText.isEmpty,
                !self.journalTitle.isEmpty else { return }
            
            let sessionMood = self.faceTrackingViewModel.sessionMood
            
            let entry = JournalEntry(
                id: UUID().uuidString,
                title: self.journalTitle,
                topic: self.selectedTopic,
                text: self.journalText,
                timestamp: Date(),
                sessionMood: sessionMood
            )
            
            self.firebaseService.save(entry: entry) { success in
                if success {
                    self.journalText = ""
                    self.journalTitle = ""
                    self.selectedTopic = "Friends"
                } else {
                    print("Failed to save entry.")
                }
            }
        }
    }
}
