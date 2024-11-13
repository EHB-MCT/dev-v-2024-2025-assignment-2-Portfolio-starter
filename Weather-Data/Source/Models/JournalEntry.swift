//
//  JournalEntry.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import Foundation

struct JournalEntry {
    var id: String
    var text: String
    var timestamp: Date
    var emotionData: EmotionData
    var sessionMood: String
}
