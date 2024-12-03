//
//  MoodColor.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

/// An enum representing different mood colors.
enum MoodColor {
    case happy, sad, neutral
    
    /// Provides a color for each mood.
    var color: Color {
        switch self {
        case .happy: return .green
        case .sad: return .red
        case .neutral: return .gray
        }
    }
    
    /// A failable initializer to create a MoodColor from a string.
    init?(rawValue: String) {
        switch rawValue.lowercased() {
        case "happy":
            self = .happy
        case "sad":
            self = .sad
        case "neutral":
            self = .neutral
        default:
            return nil
        }
    }
    
    /// A computed property to convert the mood to a string.
    var stringValue: String {
        switch self {
        case .happy: return "happy"
        case .sad: return "sad"
        case .neutral: return "neutral"
        }
    }
}
