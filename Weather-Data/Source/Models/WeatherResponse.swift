//
//  WeatherResponse.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

struct WeatherResponse: Codable, Equatable {
    let name: String
    let main: Main
    let weather: [Weather]
    let wind: Wind
    let timezone: Int
    
    struct Main: Codable, Equatable {
        let temp: Double
        let humidity: Double
        let pressure: Double
    }
    
    struct Weather: Codable, Equatable {
        let description: String
    }
    
    struct Wind: Codable, Equatable {
        let speed: Double
    }
}
