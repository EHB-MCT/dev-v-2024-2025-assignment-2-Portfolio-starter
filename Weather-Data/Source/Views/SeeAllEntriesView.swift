//
//  SeeAllEntriesView.swift
//
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import SwiftUI

/// Displays a list of all saved entries.
struct SeeAllEntriesView: View {
    @StateObject private var viewModel = EntriesListViewModel()

    var body: some View {
        NavigationView {
            List(viewModel.entries) { entry in
                NavigationLink(destination: EntryDetailView(entry: entry)) {
                    VStack(alignment: .leading) {
                        Text(entry.title)
                            .font(.headline)
                        Text("Topic: \(entry.topic)")
                            .font(.subheadline)
                        Text("Mood: \(entry.sessionMood)")
                            .font(.subheadline)
                        Text("Date: \(entry.timestamp.formatted(.dateTime.month().day().year()))")
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    .padding(.vertical, 5)
                }
            }
            .onAppear {
                viewModel.fetchAllEntries()
            }
            .navigationTitle("All Entries")
        }
    }
}

#Preview {
    SeeAllEntriesView()
}
