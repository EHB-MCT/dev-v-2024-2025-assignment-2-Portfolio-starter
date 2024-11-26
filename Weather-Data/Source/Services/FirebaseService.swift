//
//  FirebaseService.swift
//   
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Firebase
import Foundation

/// A service class responsible for saving journal entries to Firebase.
/// This class handles the interaction with Firebase Firestore, allowing
/// journal entries to be saved with relevant emotion data.
class FirebaseService {
    
    /// Saves a journal entry to the Firebase Firestore database.
    ///
    /// This method takes a `JournalEntry` object and attempts to save its data to a "journalEntries" collection
    /// in Firebase. The entry includes fields like text, timestamp, emotion data, and session mood.
    ///
    /// - Parameters:
    ///   - entry: The `JournalEntry` object containing information to be saved.
    ///   - completion: A closure that is called with a `Bool` indicating success (`true`) or failure (`false`).
    ///                 The closure is executed on completion of the save operation.
    func save(entry: JournalEntry, completion: @escaping (Bool) -> Void) {
        print("Saving entry to Firebase: \(entry)")

        let db = Firestore.firestore()
        
        db.collection("journalEntries").addDocument(data: [
            "id": entry.id,
            "title": entry.title,
            "topic": entry.topic,
            "text": entry.text,
            "timestamp": entry.timestamp,
            "sessionMood": entry.sessionMood
        ]) { error in
            if let error = error {
                print("Error saving entry: \(error.localizedDescription)")
                completion(false)
            } else {
                print("Entry saved successfully.")
                completion(true) 
            }
        }
    }
}
