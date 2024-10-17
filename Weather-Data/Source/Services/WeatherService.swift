//
//  WeatherService.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import Foundation
import Combine

class WeatherService {
    
    func logUserUsage(city: String) {
        let currentDate = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        let formattedDate = dateFormatter.string(from: currentDate)
        print("User requested weather data for \(city) at \(formattedDate)")
    }
    
    func fetchWeather(for city: String) -> AnyPublisher<WeatherResponse?, Never> {
            logUserUsage(city: city)

            let apiKey = "c9ff98f667eebccac02d47277e96b16c"
            let urlString = "https://api.openweathermap.org/data/2.5/weather?q=\(city)&appid=\(apiKey)&units=metric"
            
            guard let url = URL(string: urlString) else {
                print("Invalid URL")
                return Just(nil).eraseToAnyPublisher()
            }

            return URLSession.shared.dataTaskPublisher(for: url)
                .map { $0.data }
                .decode(type: WeatherResponse?.self, decoder: JSONDecoder())
                .receive(on: DispatchQueue.main)
                .replaceError(with: nil)
                .eraseToAnyPublisher()
        }
}
