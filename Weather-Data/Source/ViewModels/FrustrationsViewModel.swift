//
//  FrustrationsViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 10/12/2024.
//

import Foundation
import Combine

/// ViewModel for handling frustration-related data logic.
/// This class is responsible for fetching, filtering, and processing frustration entries and providing data to the `FrustrationsView`.
class FrustrationsViewModel: ObservableObject {
    
    /// The list of all frustration entries fetched from the database.
    @Published var frustrations: [Frustration] = []
    
    /// The list of frustration entries that are filtered based on the selected topic.
    @Published var filteredFrustrations: [Frustration] = []
    
    /// The selected topic used for filtering the frustration entries. It defaults to "All".
    @Published var selectedTopic: String = "All" {
        /// Whenever the `selectedTopic` is changed, the frustrations are filtered based on the new selection.
        didSet {
            filterFrustrations()
        }
    }

    private var moodsViewModel: MoodsViewModel
    private var firebaseService: FirebaseService

    /// Initializes the ViewModel with the provided MoodsViewModel and FirebaseService.
    ///
    /// - Parameters:
    ///   - moodsViewModel: The `MoodsViewModel` instance for managing mood-related data.
    ///   - firebaseService: The `FirebaseService` instance for fetching frustration entries.
    init(moodsViewModel: MoodsViewModel, firebaseService: FirebaseService) {
        self.moodsViewModel = moodsViewModel
        self.firebaseService = firebaseService
        self.fetchFrustrations()
    }

    /// Fetches frustration entries from Firebase and processes them.
    func fetchFrustrations() {
        firebaseService.fetchEntries(with: ["topic": "Frustration"]) { result in
            switch result {
            case .success(let entries):
                self.frustrations = entries.map { entry in
                    Frustration(topic: entry.topic, description: entry.text, timestamp: entry.timestamp)
                }
                self.filterFrustrations()
            case .failure(let error):
                print("Error fetching frustrations: \(error.localizedDescription)")
            }
        }
    }

    /// Filters the frustration entries based on the selected topic.
    func filterFrustrations() {
        if selectedTopic == "All" {
            filteredFrustrations = frustrations
        } else {
            filteredFrustrations = frustrations.filter { $0.topic == selectedTopic }
        }
    }

    /// A computed property that returns the most frequent frustration topic.
    ///
    /// This is determined by counting the occurrences of each topic and returning the one with the highest count.
    var mostFrequentFrustrationTopic: String? {
        let topicCounts = frustrations.reduce(into: [String: Int]()) { counts, frustration in
            counts[frustration.topic, default: 0] += 1
        }
        return topicCounts.max(by: { $0.value < $1.value })?.key
    }

    /// A computed property that returns a sorted list of unique topics from the frustrations.
    ///
    /// It extracts the topic from each frustration and returns a unique list of topics sorted alphabetically.
    var uniqueTopics: [String] {
        let topics = frustrations.map { $0.topic }
        return Array(Set(topics)).sorted()
    }

    /// A computed property that returns the mood entries for the last 5 days.
    ///
    /// It compares the mood entries' dates with the current date minus 5 days, returning only those that fall within that range.
    var last5DaysMoodEntries: [MoodEntry] {
        let fiveDaysAgo = Calendar.current.date(byAdding: .day, value: -5, to: Date()) ?? Date()
        return moodsViewModel.moodEntries.filter { $0.date >= fiveDaysAgo }
    }
}
