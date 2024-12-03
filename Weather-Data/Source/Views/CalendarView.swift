//
//  CalendarView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

/// Displays a grid-based calendar with mood colors for each day.
struct CalendarView: View {
    let dailyMoodColors: [Date: MoodColor]

    private var daysInCurrentMonth: [Date] {
        guard let range = Calendar.current.range(of: .day, in: .month, for: Date()) else {
            return []
        }

        return range.compactMap { day -> Date? in
            let components = Calendar.current.dateComponents([.year, .month], from: Date())
            return Calendar.current.date(from: DateComponents(year: components.year, month: components.month, day: day))
        }
    }

    var body: some View {
        let columns = Array(repeating: GridItem(.flexible(), spacing: 10), count: 7)

        LazyVGrid(columns: columns, spacing: 10) {
            ForEach(daysInCurrentMonth, id: \.self) { date in
                Circle()
                    .fill(dailyMoodColors[date]?.color ?? Color.gray)
                    .frame(width: 40, height: 40)
                    .overlay(
                        Text("\(Calendar.current.component(.day, from: date))")
                            .font(.caption)
                            .foregroundColor(.white)
                    )
            }
        }
        .padding()
    }
}

#Preview {
    CalendarView(dailyMoodColors: [:])
}
