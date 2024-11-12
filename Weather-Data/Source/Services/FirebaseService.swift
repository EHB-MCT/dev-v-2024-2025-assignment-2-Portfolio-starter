//
//  FirebaseService.swift
//  test eyetracking
//
//  Created by Guillaume Dochy on 08/11/2024.
//


import Firebase
import Foundation

class FirebaseService {
    private let db = Firestore.firestore()
    
    func save(entry: JournalEntry, completion: @escaping (Bool) -> Void) {
        let data: [String: Any] = [
            "text": entry.text,
            "timestamp": entry.timestamp,
            "sessionMood": entry.sessionMood,  
            "emotionData": entry.emotionData.emotionScores
        ]
        
        db.collection("journalEntries").document(entry.id).setData(data) { error in
            completion(error == nil)
        }
    }
}
