//
//  FrustrationsView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//

import SwiftUI

/// The view that displays frustration-related data including mood for the last 5 days, frustrations by topic,
/// and links to potential solutions for each frustration.
struct FrustrationsView: View {
    @ObservedObject var frustrationsViewModel: FrustrationsViewModel

    var body: some View {
        VStack {
            Section(header: Text("Mood from the Last 5 Days").font(.headline)) {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                    ForEach(frustrationsViewModel.last5DaysMoodEntries, id: \.date) { entry in
                        VStack {
                            Text("\(entry.date, formatter: DateFormatter.shortDate)")
                                .font(.footnote)
                            Circle()
                                .fill(entry.mood.color)
                                .frame(width: 30, height: 30)
                                .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        }
                    }
                }
            }

            Divider()

            Section(header: Text("Frustrations").font(.headline)) {
                Picker("Select Topic", selection: $frustrationsViewModel.selectedTopic) {
                    Text("All").tag("All")
                    ForEach(frustrationsViewModel.uniqueTopics, id: \.self) { topic in
                        Text(topic).tag(topic)
                    }
                }
                .pickerStyle(MenuPickerStyle())
                .padding()

                ForEach(frustrationsViewModel.filteredFrustrations, id: \.timestamp) { frustration in
                    VStack(alignment: .leading) {
                        Text(frustration.topic).font(.subheadline).bold()
                        Text(frustration.description).font(.body).foregroundColor(.gray)
                        Text("Timestamp: \(frustration.timestamp, formatter: DateFormatter.mediumDate)").font(.footnote)
                    }
                    .padding(.bottom, 5)
                }
            }

            Divider()

            if let mostFrequentTopic = frustrationsViewModel.mostFrequentFrustrationTopic {
                Section(header: Text("Most Frequent Frustration Topic").font(.headline)) {
                    Text(mostFrequentTopic)
                        .font(.body)
                        .foregroundColor(.red)
                }
            }

            Divider()

            Section(header: Text("Potential Solutions").font(.headline)) {
                ForEach(frustrationsViewModel.filteredFrustrations, id: \.timestamp) { frustration in
                    VStack(alignment: .leading) {
                        Text("Potential solutions for \(frustration.topic):")
                            .font(.subheadline)
                            .bold()

                        Link("Explore Solutions", destination: URL(string: "https://example.com/solutions/\(frustration.topic)")!)
                            .font(.body)
                            .foregroundColor(.blue)
                    }
                }
            }
        }
        .padding()
        .onChange(of: frustrationsViewModel.selectedTopic) { _ in
            frustrationsViewModel.filterFrustrations()
        }
    }
}

extension DateFormatter {
    /// A DateFormatter that formats dates to show the day number (e.g., 01, 02, etc.)
    static var shortDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "dd"  // day only
        return formatter
    }

    /// A DateFormatter that formats dates to a medium date format (e.g., "Jan 01, 2024")
    static var mediumDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM dd, yyyy"  // full date format
        return formatter
    }
}

#Preview {
    FrustrationsView(
        frustrationsViewModel: FrustrationsViewModel(
            moodsViewModel: MoodsViewModel(),
            firebaseService: FirebaseService() 
        )
    )
}
