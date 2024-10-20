//
//  FirestoreService.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import FirebaseFirestore

class FirestoreService {
    private var db = Firestore.firestore()
    
    func logUserInteraction(city: String) {
        let data: [String: Any] = [
            "city": city,
            "timestamp": Timestamp(date: Date())
        ]
        let docRef = Firestore.firestore().collection("user_interactions").document()
        
        docRef.setData(data) { error in
            if let error = error {
                print("Error logging user interaction: \(error.localizedDescription)")
            } else {
                print("User interaction logged successfully.")
            }
        }
    }
    
    func logWeatherData(city: String, temperature: Double, humidity: Int, pressure: Int, windSpeed: Double) {
        let timestamp = Timestamp(date: Date())
        
        let data: [String: Any] = [
            "city": city,
            "temperature": temperature,
            "humidity": humidity,
            "pressure": pressure,
            "windSpeed": windSpeed,
            "timestamp": timestamp
        ]
        
        db.collection("weather_data").addDocument(data: data) { error in
            if let error = error {
                print("Error logging weather data: \(error)")
            } else {
                print("Weather data logged successfully.")
            }
        }
    }
}
