//
//  MoodsViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import Foundation
import Combine

class MoodsViewModel: ObservableObject {
    @Published var dailyMoodColors: [Date: MoodColor] = [:]
    @Published var weeklyMoodSummary: [String: MoodColor] = [:]

    private let firebaseService = FirebaseService()
    private var cancellables = Set<AnyCancellable>()

    func fetchMoods() {
        firebaseService.fetchEntries { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let entries):
                    self?.processEntries(entries)
                case .failure(let error):
                    print("Failed to fetch entries: \(error.localizedDescription)")
                }
            }
        }
    }

    private func processEntries(_ entries: [EntryModel]) {
        let groupedByDay = Dictionary(grouping: entries) { entry in
            Calendar.current.startOfDay(for: entry.timestamp)
        }

        dailyMoodColors = groupedByDay.mapValues { entries in
            let moodCounts = entries.reduce(into: [String: Int]()) { counts, entry in
                counts[entry.sessionMood, default: 0] += 1
            }
            let mostCommonMood = moodCounts.max { $0.value < $1.value }?.key ?? "Neutral"
            return MoodColor(mood: mostCommonMood)
        }

        let groupedByWeek = Dictionary(grouping: groupedByDay.keys) { date in
            Calendar.current.component(.weekOfYear, from: date)
        }

        weeklyMoodSummary = groupedByWeek.reduce(into: [String: MoodColor]()) { result, weekData in
            let weekNumber = "Week \(weekData.key)"
            let days = weekData.value

            let moodCounts = days.compactMap { dailyMoodColors[$0]?.mood }.reduce(into: [String: Int]()) { counts, mood in
                counts[mood, default: 0] += 1
            }
            let mostCommonMood = moodCounts.max { $0.value < $1.value }?.key ?? "Neutral"
            result[weekNumber] = MoodColor(mood: mostCommonMood)
        }
    }
}
