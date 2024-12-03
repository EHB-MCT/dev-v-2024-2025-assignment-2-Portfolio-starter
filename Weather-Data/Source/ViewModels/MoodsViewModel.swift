//
//  MoodsViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI
import Combine

class MoodsViewModel: ObservableObject {
    @Published var moodEntries: [MoodEntry] = []
    
    private var firebaseService = FirebaseService()
    
    init() {
        fetchMoodEntries()
    }
    
    /// Fetches the mood entries from Firebase and processes them.
    func fetchMoodEntries() {
        // Fetch entries and process them into MoodEntries.
        firebaseService.fetchEntries { result in
            switch result {
            case .success(let entries):
                self.moodEntries = self.processEntries(entries)
            case .failure(let error):
                print("Error fetching entries: \(error)")
            }
        }
    }
    
    /// Processes entries and categorizes them by day and mood.
    private func processEntries(_ entries: [EntryModel]) -> [MoodEntry] {
        var moodEntries: [MoodEntry] = []
        
        for entry in entries {
            let mood = MoodColor(rawValue: entry.sessionMood.lowercased()) ?? .neutral
            let moodEntry = MoodEntry(date: entry.timestamp, mood: mood)
            moodEntries.append(moodEntry)
        }
        
        return moodEntries
    }
}
