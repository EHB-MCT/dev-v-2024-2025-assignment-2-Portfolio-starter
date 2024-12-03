//
//  MoodColor.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//


import SwiftUI

/// Represents a mood and its associated color.
struct MoodColor {
    let mood: String

    /// Returns the color corresponding to the mood.
    var color: Color {
        switch mood.lowercased() {
        case "happy": return .green
        case "sad": return .blue
        case "angry": return .red
        case "neutral": return .gray
        case "excited": return .yellow
        default: return .gray
        }
    }
}
