//
//  EntryDetailView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 29/11/2024.
//

import SwiftUI

/// Displays detailed information for a single entry.
struct EntryDetailView: View {
    let entry: EntryModel

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(entry.title)
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding(.bottom)

            Text("**Topic:** \(entry.topic)")
                .font(.headline)

            Text("**Mood:** \(entry.sessionMood)")
                .font(.headline)

            Text("**Date:** \(entry.timestamp.formatted(.dateTime.month().day().year().hour().minute()))")
                .font(.subheadline)
                .foregroundColor(.gray)

            Text("**Your journal:**")
                .font(.headline)
                .padding(.top)

            ScrollView {
                Text(entry.text)
                    .font(.body)
                    .padding()
            }

            Spacer()
        }
        .padding()
        .navigationTitle("Entry Details")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    EntryDetailView(entry: EntryModel(id: "1", title: "Title", topic: "Topic", text: "Text", timestamp: .now, sessionMood: "Happy"))
}
