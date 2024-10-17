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
        private var cancellables = Set<AnyCancellable>()

        func fetchWeather(for city: String) {
            weatherService.fetchWeather(for: city)
                .sink { [weak self] weatherResponse in
                    self?.weather = weatherResponse
                }
                .store(in: &cancellables)
        }
}

