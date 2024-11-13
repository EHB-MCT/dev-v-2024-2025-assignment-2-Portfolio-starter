//
//  FirebaseService.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import Firebase
import Foundation

class FirebaseService {
    func save(entry: JournalEntry, completion: @escaping (Bool) -> Void) {
//        print("Saving entry to Firebase: \(entry)")

        let db = Firestore.firestore()
        db.collection("journalEntries").addDocument(data: [
            "id": entry.id,
            "text": entry.text,
            "timestamp": entry.timestamp,
            "emotionData": [
                "smile": entry.emotionData.smile,
                "frown": entry.emotionData.frown,
                "raisedEyebrow": entry.emotionData.raisedEyebrow,
                "jawOpen": entry.emotionData.jawOpen
            ],
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
