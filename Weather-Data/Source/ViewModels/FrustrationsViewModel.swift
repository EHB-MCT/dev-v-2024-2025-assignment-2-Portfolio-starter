//
//  FrustrationsViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 10/12/2024.
//


import SwiftUI
import Combine

class FrustrationsViewModel: ObservableObject {
    @Published var frustrations: [Frustration] = []
    @Published var filteredFrustrations: [Frustration] = []
    @Published var selectedTopic: String = "All"
    
    private let moodsViewModel: MoodsViewModel
    
    init(moodsViewModel: MoodsViewModel) {
        self.moodsViewModel = moodsViewModel
        self.frustrations = []
        self.filteredFrustrations = frustrations
    }

    var last5DaysMoodEntries: [MoodEntry] {
        let calendar = Calendar.current
        let fiveDaysAgo = calendar.date(byAdding: .day, value: -5, to: Date()) ?? Date()
        return moodsViewModel.moodEntries.filter { entry in
            return entry.date >= fiveDaysAgo
        }
    }

    var mostFrequentFrustrationTopic: String? {
        let frustrationTopics = frustrations
            .filter { $0.topic == "Frustration" }
            .map { $0.topic }

        let frequency = frustrationTopics.reduce(into: [String: Int]()) { counts, topic in
            counts[topic, default: 0] += 1
        }

        return frequency.max { $0.value < $1.value }?.key
    }

    func filterFrustrations() {
        if selectedTopic == "All" {
            filteredFrustrations = frustrations
        } else {
            filteredFrustrations = frustrations.filter { $0.topic == selectedTopic }
        }
    }

    var uniqueTopics: [String] {
        let topics = frustrations.map { $0.topic }
        let uniqueTopics = Set(topics)
        return Array(uniqueTopics)
    }
}
