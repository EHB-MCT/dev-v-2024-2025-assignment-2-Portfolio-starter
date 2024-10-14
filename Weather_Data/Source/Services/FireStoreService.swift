//
//  FireStoreService.swift
//  Weather_Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import Foundation
import FirebaseFirestore

class FirestoreService {
    private var db = Firestore.firestore()
    
    func logUserInteraction(city: String, latitude: Double, longitude: Double) {
        let timestamp = Timestamp(date: Date())  
        
        let data: [String: Any] = [
            "city": city,
            "latitude": latitude,
            "longitude": longitude,
            "timestamp": timestamp
        ]
        
        db.collection("user_interactions").addDocument(data: data) { error in
            if let error = error {
                print("Error logging user interaction: \(error)")
            } else {
                print("User interaction logged successfully.")
            }
        }
    }
}
