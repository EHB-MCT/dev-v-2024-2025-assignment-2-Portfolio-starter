//
//  FrustrationsView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//

import SwiftUI

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
    static var shortDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "dd"
        return formatter
    }

    static var mediumDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM dd, yyyy"
        return formatter
    }
}

#Preview {
    FrustrationsView(
        frustrationsViewModel: FrustrationsViewModel(moodsViewModel: MoodsViewModel())
        )
}
