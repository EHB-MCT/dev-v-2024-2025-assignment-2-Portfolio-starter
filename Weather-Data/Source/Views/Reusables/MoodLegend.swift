//
//  MoodLegend.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

struct MoodLegend: View {
    var body: some View {
        HStack {
            VStack {
                Circle()
                    .fill(MoodColor.happy.color)
                    .frame(width: 20, height: 20)
                Text("Happy")
                    .font(.footnote)
            }
            
            VStack {
                Circle()
                    .fill(MoodColor.sad.color)
                    .frame(width: 20, height: 20)
                Text("Sad")
                    .font(.footnote)
            }
            
            VStack {
                Circle()
                    .fill(MoodColor.neutral.color)
                    .frame(width: 20, height: 20)
                Text("Neutral")
                    .font(.footnote)
            }
        }
        .padding()
    }
}
