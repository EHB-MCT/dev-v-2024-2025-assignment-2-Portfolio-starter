//
//  CalendarViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI
import Combine

class CalendarViewModel: ObservableObject {
    @Published var days: [MoodEntry] = []
    
    private var moodsViewModel: MoodsViewModel
    
    init(moodsViewModel: MoodsViewModel) {
        self.moodsViewModel = moodsViewModel
        generateCalendar()
    }
    
    /// Generates the calendar with moods assigned to each day.
    func generateCalendar() {
        let calendar = Calendar.current
        let today = Date()
        
        let startOfMonth = calendar.date(from: calendar.dateComponents([.year, .month], from: today))!
        
        let firstWeekday = calendar.component(.weekday, from: startOfMonth)
        
        let range = calendar.range(of: .day, in: .month, for: today)!
        let numDaysInMonth = range.count
        
        var calendarDays: [MoodEntry] = []
        
        for _ in 1..<firstWeekday {
            calendarDays.append(MoodEntry(date: Date(), mood: .neutral))
        }
        
        for index in 0..<numDaysInMonth {
            let date = calendar.date(byAdding: .day, value: index, to: startOfMonth)!
            let moodForDay = moodForDate(date)
            let day = MoodEntry(date: date, mood: moodForDay)
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
        
        let moodCounts = matchingEntries.reduce(into: [MoodColor: Int]()) { counts, entry in
            counts[entry.mood, default: 0] += 1
        }
        
        let mostCommonMood = moodCounts.max { $0.value < $1.value }?.key ?? .neutral
        return mostCommonMood
    }
    
    /// Checks if two dates are on the same day.
    private func isSameDay(_ date1: Date, _ date2: Date) -> Bool {
        return Calendar.current.isDate(date1, inSameDayAs: date2)
    }
}
