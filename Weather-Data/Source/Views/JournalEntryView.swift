//
//  JournalEntryView.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import SwiftUI

struct JournalEntryView: View {
    @StateObject private var viewModel = JournalEntryViewModel()
    @StateObject private var faceTrackingViewModel = FaceTrackingViewModel()

    var body: some View {
        VStack {
            Text("Journal Entry")
                .font(.largeTitle)
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
    }
}

#Preview {
    JournalEntryView()
}
