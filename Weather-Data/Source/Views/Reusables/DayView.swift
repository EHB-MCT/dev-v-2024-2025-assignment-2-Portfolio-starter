//
//  DayView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

struct DayView: View {
    var day: CalendarDay
    
    var body: some View {
        VStack {
            Text(dayNumber)
                .font(.caption)
                .foregroundColor(day.mood == .neutral ? .black : .white)
                .padding(5)
                .background(day.mood == .neutral ? Color.white.opacity(0.1) : Color.clear)
            
            Circle()
                .fill(day.mood.color)
                .frame(width: 20, height: 20)
        }
        .padding(5)
        .background(day.mood == .neutral ? Color.white.opacity(0.2) : day.mood.color)
        .cornerRadius(8)
        .shadow(radius: 5)
    }
    
    private var dayNumber: String {
        let calendar = Calendar.current
        let day = calendar.component(.day, from: day.date)
        return "\(day)"
    }
}
