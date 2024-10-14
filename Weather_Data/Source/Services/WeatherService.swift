//
//  WeatherService.swift
//  Weather_Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import Foundation

class WeatherService {
    func logUserUsage(city: String) {
        let currentDate = Date()
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        let formattedDate = dateFormatter.string(from: currentDate)
        
        print("User requested weather data for \(city) at \(formattedDate)")
    }
    
    func fetchWeather(for city: String, completion: @escaping (WeatherResponse?) -> Void) {
        logUserUsage(city: city)  
        
        let apiKey = "c9ff98f667eebccac02d47277e96b16c"
        let urlString = "https://api.openweathermap.org/data/2.5/weather?q=\(city)&appid=\(apiKey)&units=metric"
        
        guard let url = URL(string: urlString) else {
            print("Invalid URL")
            return
        }
        
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                print("No data or error: \(String(describing: error))")
                completion(nil)
                return
            }
            
            let weatherResponse = try? JSONDecoder().decode(WeatherResponse.self, from: data)
            DispatchQueue.main.async {
                completion(weatherResponse)
            }
        }.resume()
    }
}
