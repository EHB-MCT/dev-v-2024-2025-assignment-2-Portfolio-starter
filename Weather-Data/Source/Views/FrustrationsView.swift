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
    /// The ViewModel that handles the business logic and data for frustrations.
    @ObservedObject var frustrationsViewModel: FrustrationsViewModel
    @StateObject private var articleListViewModel = ArticleListViewModel()

    var body: some View {
        VStack {
            /// Section displaying mood entries for the last 5 days
            Section(header: Text("Mood from the Last 5 Days").font(.headline)) {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                    /// Loop through the `last5DaysMoodEntries` to show each day's mood
                    ForEach(frustrationsViewModel.last5DaysMoodEntries, id: \.date) { entry in
                        VStack {
                            /// Display the date of the mood entry formatted as "dd"
                            Text("\(entry.date, formatter: DateFormatter.shortDate)")
                                .font(.footnote)
                            /// Circle displaying the mood color
                            Circle()
                                .fill(entry.mood.color)
                                .frame(width: 30, height: 30)
                                .overlay(Circle().stroke(Color.white, lineWidth: 2))
                        }
                    }
                }
            }

            Divider()

            /// Section displaying the list of frustrations
            Section(header: Text("Frustrations").font(.headline)) {
                /// Picker for selecting a topic to filter frustrations
                Picker("Select Topic", selection: $frustrationsViewModel.selectedTopic) {
                    Text("All").tag("All")
                    /// Loop through unique topics for the topic selection
                    ForEach(frustrationsViewModel.uniqueTopics, id: \.self) { topic in
                        Text(topic).tag(topic)
                    }
                }
                .pickerStyle(MenuPickerStyle())
                .padding()

                /// Loop through filtered frustrations and display each one
                ForEach(frustrationsViewModel.filteredFrustrations, id: \.timestamp) { frustration in
                    VStack(alignment: .leading) {
                        /// Display the frustration topic in bold
                        Text(frustration.topic).font(.subheadline).bold()
                        /// Display the description of the frustration in gray
                        Text(frustration.description).font(.body).foregroundColor(.gray)
                        /// Display the timestamp of the frustration entry formatted as "MMM dd, yyyy"
                        Text("Timestamp: \(frustration.timestamp, formatter: DateFormatter.mediumDate)").font(.footnote)
                    }
                    .padding(.bottom, 5)
                }
            }

            Divider()

            /// Display the most frequent frustration topic if available
            if let mostFrequentTopic = frustrationsViewModel.mostFrequentFrustrationTopic {
                Section(header: Text("Most Frequent Frustration Topic").font(.headline)) {
                    /// Display the most frequent frustration topic in red
                    Text(mostFrequentTopic)
                        .font(.body)
                        .foregroundColor(.red)
                }
            }

            Divider()

            /// Section for selecting a topic and fetching related articles.
                        Section(header: Text("Related Articles").font(.headline)) {
                            Picker("Select Topic", selection: $frustrationsViewModel.selectedTopic) {
                                Text("All").tag("All")
                                ForEach(frustrationsViewModel.uniqueTopics, id: \.self) { topic in
                                    Text(topic).tag(topic)
                                }
                            }
                            .pickerStyle(MenuPickerStyle())
                            .onChange(of: frustrationsViewModel.selectedTopic) { newTopic in
                                if newTopic != "All" {
                                    articleListViewModel.fetchArticles(for: newTopic)
                                }
                            }

                            ArticleListView(viewModel: articleListViewModel)
                        }
            
            Divider()
            
            Text("Legend:")
                .font(.body)
            MoodLegend()
            
        }
        .padding()
        /// Observe changes in the selected topic and trigger filtering
        .onChange(of: frustrationsViewModel.selectedTopic) { _ in
            frustrationsViewModel.filterFrustrations()
        }
    }
}

extension DateFormatter {
    /// A DateFormatter that formats dates to show the day number (e.g., 01, 02, etc.)
    static var shortDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "dd" 
        return formatter
    }

    /// A DateFormatter that formats dates to a medium date format (e.g., "Jan 01, 2024")
    static var mediumDate: DateFormatter {
        let formatter = DateFormatter()
        formatter.dateFormat = "MMM dd, yyyy"
        return formatter
    }
}

/// Preview for the FrustrationsView
#Preview {
    FrustrationsView(
        frustrationsViewModel: FrustrationsViewModel(
            moodsViewModel: MoodsViewModel(),
            firebaseService: FirebaseService()
        )
    )
}
