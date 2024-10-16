//
//  ContentView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import SwiftUI
import CoreLocation

struct ContentView: View {
    @StateObject private var locationManager = LocationManager()
    @State private var weather: WeatherResponse?
    @State private var city: String = "London"
    
    private var firestoreService = FirestoreService()
    
    var body: some View {
        VStack {
            if locationManager.authorizationStatus == .notDetermined {
                            Button("Allow Location Access") {
                                locationManager.requestLocationAccess()
                            }
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                        }
            
            TextField("Enter city name", text: $city)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            Button("Get Weather") {
                fetchWeather()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
            
            if let weather = weather {
                Text("Temperature: \(weather.main.temp, specifier: "%.1f")°C")
                    .font(.largeTitle)
                    .padding()
                
                Text("Condition: \(weather.weather.first?.description ?? "Unknown")")
                    .font(.title2)
                    .padding()
            } else {
                Text("Enter a city to get weather data.")
                    .padding()
            }
            
            if let location = locationManager.userLocation {
                Text("User's location: \(location.latitude), \(location.longitude)")
                    .padding()
            }
        }
        .padding()
    }
    
    func fetchWeather() {
        let service = WeatherService()
        service.fetchWeather(for: city) { weatherResponse in
            self.weather = weatherResponse
            
            if let location = locationManager.userLocation {
                firestoreService.logUserInteraction(city: city, latitude: location.latitude, longitude: location.longitude)
            }
        }
    }
}

#Preview {
    ContentView()
}
