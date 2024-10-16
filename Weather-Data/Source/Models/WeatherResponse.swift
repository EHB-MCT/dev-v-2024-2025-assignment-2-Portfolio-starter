//
//  WeatherResponse.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import Foundation

struct WeatherResponse: Decodable {
    let main: Main
    let weather: [Weather]
    
    struct Main: Decodable {
        let temp: Double
    }
    
    struct Weather: Decodable {
        let description: String
    }
}
