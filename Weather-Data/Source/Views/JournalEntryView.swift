//
//  JournalEntryView.swift
//
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import SwiftUI

/// A view for creating and saving a journal entry, with integrated face tracking.
/// `JournalEntryView` allows users to type their journal entry, view their detected mood, and save the entry to Firebase.
/// It leverages `FaceTrackingViewModel` for real-time emotion tracking and `JournalEntryViewModel` for managing the entry text and save functionality.
struct JournalEntryView: View {
    
    /// The view model that handles the journal entry text and save functionality.
    @StateObject private var viewModel = JournalEntryViewModel()
    
    /// The view model responsible for face tracking and mood analysis.
    @StateObject private var faceTrackingViewModel = FaceTrackingViewModel()

    /// The main view body displaying a text editor for the journal entry, a button to save, and a mood indicator.
    var body: some View {
        VStack {
                    Text("Journal Entry")
                        .font(.largeTitle)
                        .padding()

                    TextField("Title", text: $viewModel.journalTitle)
                        .padding()
                        .border(Color.gray, width: 1)

                    Picker("Topic", selection: $viewModel.selectedTopic) {
                        Text("Friends").tag("Friends")
                        Text("Family").tag("Family")
                        Text("Love interest/Significant other").tag("Love interest/Significant other")
                        Text("School").tag("School")
                        Text("Work").tag("Work")
                    }
                    .pickerStyle(MenuPickerStyle())
                    .padding()

                    TextEditor(text: $viewModel.journalText)
                        .frame(height: 200)
                        .padding()
                        .border(Color.gray, width: 1)
                        .highPriorityGesture(DragGesture())

                    Button(action: {
                        viewModel.saveJournalEntry()
                    }) {
                        Text("Save Entry")
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }

                    if !faceTrackingViewModel.sessionMood.isEmpty {
                        Text("Your Mood: \(faceTrackingViewModel.sessionMood)")
                            .font(.headline)
                            .padding()
                    }

                    Spacer()
                }
                .onAppear {
                    faceTrackingViewModel.startTracking()
                }
                .onDisappear {
                    faceTrackingViewModel.stopTracking()
                }
                .padding()
            }
}

#Preview {
    JournalEntryView()
}
