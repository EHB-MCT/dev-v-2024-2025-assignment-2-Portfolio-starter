//
//  ContentViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 16/10/2024.
//

import Foundation
import Combine

class ContentViewModel: ObservableObject {
    @Published var weather: WeatherResponse? 
    private var weatherService = WeatherService()

    func fetchWeather(for city: String) {
        weatherService.fetchWeather(for: city) { [weak self] weatherResponse in
            DispatchQueue.main.async {
                self?.weather = weatherResponse
            }
        }
    }
}
