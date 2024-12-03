//
//  CalendarViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

class CalendarViewModel: ObservableObject {
    @Published var days: [CalendarDay] = []
    
    private var moodsViewModel: MoodsViewModel

    init(moodsViewModel: MoodsViewModel) {
        self.moodsViewModel = moodsViewModel
        generateCalendar()
    }
    
    /// Generates the calendar with moods assigned to each day.
    func generateCalendar() {
        let calendar = Calendar.current
        let today = Date()
        var calendarDays: [CalendarDay] = []
        
        for index in 0..<30 {
            let date = calendar.date(byAdding: .day, value: index, to: today)!
            let moodForDay = moodForDate(date)
            let day = CalendarDay(date: date, mood: moodForDay)
            calendarDays.append(day)
        }
        
        days = calendarDays
    }
    
    /// Determines the mood for a specific day.
    private func moodForDate(_ date: Date) -> MoodColor {
        let matchingEntries = moodsViewModel.moodEntries.filter { isSameDay($0.date, date) }
        
        if matchingEntries.isEmpty {
            return .neutral
        }
        
        let moodCounts = matchingEntries.reduce(into: [String: Int]()) { counts, entry in
            let moodString = entry.mood.stringValue
            counts[moodString, default: 0] += 1
        }
        
        let mostCommonMoodString = moodCounts.max { $0.value < $1.value }?.key ?? "neutral"
        
        let mostCommonMood = MoodColor(rawValue: mostCommonMoodString) ?? .neutral
        return mostCommonMood
    }
    
    /// Checks if two dates are on the same day.
    private func isSameDay(_ date1: Date, _ date2: Date) -> Bool {
        return Calendar.current.isDate(date1, inSameDayAs: date2)
    }
}
