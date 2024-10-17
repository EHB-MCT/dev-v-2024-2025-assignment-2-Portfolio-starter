//
//  WeatherResponse.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import Foundation

struct WeatherResponse: Decodable, Equatable {
    let main: Main
    let weather: [Weather]
    
}

struct Main: Decodable, Equatable {
    let temp: Double
}

struct Weather: Decodable, Equatable {
    let description: String
}
