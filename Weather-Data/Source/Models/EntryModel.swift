//
//  EntryModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 29/11/2024.
//

import Foundation

/// A model representing a generic entry (e.g., journal, mood, etc.).
struct EntryModel: Identifiable {
    let id: String
    let title: String
    let topic: String
    let text: String
    let timestamp: Date
    let sessionMood: String
}
