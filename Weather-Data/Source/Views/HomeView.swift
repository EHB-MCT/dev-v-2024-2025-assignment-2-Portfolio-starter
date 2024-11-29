//
//  HomeView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Welcome to Your Journal")
                    .font(.largeTitle)
                    .multilineTextAlignment(.center)
                    .padding()
                
                Spacer()
                
                NavigationLink(destination: JournalEntryView()) {
                    HomeButton(title: "Enter Entry", color: .blue)
                }
                
                NavigationLink(destination: SeeAllEntriesView()) {
                    HomeButton(title: "See All Entries", color: .green)
                }
                
                NavigationLink(destination: MoodsView()) {
                    HomeButton(title: "Moods", color: .purple)
                }
                
                NavigationLink(destination: FrustrationsView()) {
                    HomeButton(title: "Frustrations", color: .red)
                }
                
                Spacer()
            }
            .padding()
        }
    }
}

#Preview {
    HomeView()
}
