//
//  MoodsView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//


import SwiftUI

/// Displays a calendar view of moods and a weekly mood summary.
struct MoodsView: View {
    @StateObject private var viewModel = MoodsViewModel()

    var body: some View {
        VStack {
            Text("Your Mood Calendar")
                .font(.largeTitle)
                .padding()

            CalendarView(dailyMoodColors: viewModel.dailyMoodColors)

            Divider()
                .padding(.vertical)

            Text("Weekly Mood Overview")
                .font(.headline)
                .padding(.top)

            List(viewModel.weeklyMoodSummary.sorted(by: { $0.key < $1.key }), id: \.key) { week, moodColor in
                HStack {
                    Text(week)
                    Spacer()
                    Circle()
                        .fill(moodColor.color)
                        .frame(width: 20, height: 20)
                }
            }
        }
        .onAppear {
            viewModel.fetchMoods()
        }
    }
}

#Preview {
    MoodsView()
}
