//
//  MoodsView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//

import SwiftUI

struct MoodsView: View {
    @StateObject private var moodsViewModel = MoodsViewModel()
    @State private var calendarViewModel: CalendarViewModel?
    
    var body: some View {
        VStack {
            if let calendarViewModel = calendarViewModel {
                CalendarView(viewModel: calendarViewModel)
            } else {
                Text("Loading...")
            }
        }
        .onAppear {
            moodsViewModel.fetchMoodEntries()
            calendarViewModel = CalendarViewModel(moodsViewModel: moodsViewModel)
        }
    }
}

#Preview {
    MoodsView()
}
