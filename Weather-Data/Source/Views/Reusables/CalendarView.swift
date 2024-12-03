//
//  CalendarView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

struct CalendarView: View {
    @ObservedObject var viewModel: CalendarViewModel
    
    var body: some View {
        VStack {
            HStack {
                Text("Calendar of Moods")
                    .font(.headline)
                    .padding()
                
                Spacer()
            }
            
            LazyVGrid(columns: Array(repeating: GridItem(), count: 7), spacing: 10) {
                ForEach(viewModel.days) { day in
                    DayView(day: day.date, mood: day.mood)
                }
            }
            
            MoodLegend()
                .padding(.top)
        }
        .padding()
    }
}
