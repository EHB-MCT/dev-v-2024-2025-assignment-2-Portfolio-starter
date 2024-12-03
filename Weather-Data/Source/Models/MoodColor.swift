//
//  MoodColor.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import SwiftUI

/// Enum representing possible moods with associated colors.
enum MoodColor: String {
    case happy
    case sad
    case neutral
    
    var color: Color {
        switch self {
        case .happy:
            return .green
        case .sad:
            return .blue
        case .neutral:
            return .gray
        }
    }
}
