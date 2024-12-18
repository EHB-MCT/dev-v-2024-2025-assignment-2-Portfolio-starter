//
//  FirebaseService.swift
//
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Firebase
import Foundation

/// A service for managing Firebase operations.
class FirebaseService {
    /// Saves an entry to Firebase.
    /// - Parameters:
    ///   - entry: The `JournalEntry` to save.
    ///   - completion: A closure indicating success or failure.
    func save(entry: JournalEntry, completion: @escaping (Bool) -> Void) {
        print("Saving entry to Firebase: \(entry)")

        let db = Firestore.firestore()
        db.collection("entries").addDocument(data: [
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

    /// Fetches entries from Firebase based on specified conditions.
    /// - Parameters:
    ///   - filter: A dictionary of key-value pairs to filter the results (e.g., `["topic": "Friends"]`).
    ///   - completion: A closure returning an array of `JournalEntry` or an error.
    func fetchEntries(
        with filter: [String: Any] = [:],
        completion: @escaping (Result<[JournalEntry], Error>) -> Void
    ) {
        let db = Firestore.firestore()
        var query: Query = db.collection("entries")

        for (key, value) in filter {
            query = query.whereField(key, isEqualTo: value)
        }

        query.getDocuments { snapshot, error in
            if let error = error {
                print("Error fetching entries: \(error.localizedDescription)")
                completion(.failure(error))
                return
            }

            guard let documents = snapshot?.documents else {
                print("No entries found.")
                completion(.success([]))
                return
            }

            let entries = documents.compactMap { document -> JournalEntry? in
                let data = document.data()
                guard
                    let id = data["id"] as? String,
                    let title = data["title"] as? String,
                    let topic = data["topic"] as? String,
                    let text = data["text"] as? String,
                    let timestamp = (data["timestamp"] as? Timestamp)?.dateValue(),
                    let sessionMood = data["sessionMood"] as? String
                else {
                    return nil
                }

                return JournalEntry(
                    id: id,
                    title: title,
                    topic: topic,
                    text: text,
                    timestamp: timestamp,
                    sessionMood: sessionMood
                )
            }

            completion(.success(entries))
        }
    }
}
