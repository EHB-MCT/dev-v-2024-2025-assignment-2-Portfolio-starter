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
                ForEach(viewModel.days, id: \.date) { day in
                    DayView(day: day)
                }
            }
            
            MoodLegend()
                .padding(.top)
        }
        .padding()
        .background(Color(UIColor.systemBackground))
        .cornerRadius(10)
        .foregroundColor(.primary)  
    }
}

#Preview {
    CalendarView(viewModel: CalendarViewModel(moodsViewModel: MoodsViewModel()))
}
