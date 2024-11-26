//
//  JournalEntry.swift
//   
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Foundation

/// A data model representing a journal entry created by the user.
/// Each `JournalEntry` contains the entry's text content, timestamp, associated emotion data,
/// and a general mood for the session.
struct JournalEntry {
    
    /// A unique identifier for the journal entry.
    var id: String
    
    /// Title of the journal entry.
    var title: String
    
    /// Topic of the journal entry (e.g., Friends, Family, etc.).
    var topic: String
    
    /// The text content of the journal entry written by the user.
    var text: String
    
    /// The date and time when the journal entry was created.
    var timestamp: Date
    
    /// A general description of the user’s mood during the session (e.g., "Happy", "Sad").
    var sessionMood: String
}
