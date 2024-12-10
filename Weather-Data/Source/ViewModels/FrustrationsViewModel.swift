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
    @Published var frustrations: [Frustration] = []
    @Published var filteredFrustrations: [Frustration] = []
    @Published var selectedTopic: String = "All" {
        didSet {
            filterFrustrations()
        }
    }

    private var moodsViewModel: MoodsViewModel
    private var firebaseService: FirebaseService

    init(moodsViewModel: MoodsViewModel, firebaseService: FirebaseService) {
        self.moodsViewModel = moodsViewModel
        self.firebaseService = firebaseService
        self.fetchFrustrations()
    }

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

    func filterFrustrations() {
        if selectedTopic == "All" {
            filteredFrustrations = frustrations
        } else {
            filteredFrustrations = frustrations.filter { $0.topic == selectedTopic }
        }
    }

    var mostFrequentFrustrationTopic: String? {
        let topicCounts = frustrations.reduce(into: [String: Int]()) { counts, frustration in
            counts[frustration.topic, default: 0] += 1
        }
        return topicCounts.max(by: { $0.value < $1.value })?.key
    }

    var uniqueTopics: [String] {
        let topics = frustrations.map { $0.topic }
        return Array(Set(topics)).sorted()
    }

    var last5DaysMoodEntries: [MoodEntry] {
        let fiveDaysAgo = Calendar.current.date(byAdding: .day, value: -5, to: Date()) ?? Date()
        return moodsViewModel.moodEntries.filter { $0.date >= fiveDaysAgo }
    }
}
