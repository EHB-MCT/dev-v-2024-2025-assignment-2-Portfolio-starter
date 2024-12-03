//
//  DayView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

struct DayView: View {
    let day: Date
    let mood: MoodColor
    
    var body: some View {
        VStack {
            Text(dayFormatted())
                .font(.caption)
                .padding(4)
            
            Circle()
                .fill(mood.color)
                .frame(width: 30, height: 30)
        }
    }
    
    private func dayFormatted() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "d"
        return formatter.string(from: day)
    }
}
