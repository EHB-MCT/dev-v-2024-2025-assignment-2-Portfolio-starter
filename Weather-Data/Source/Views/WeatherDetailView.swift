//
//  WeatherView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 16/10/2024.
//

import SwiftUI

struct WeatherDetailView: View {
    var weather: WeatherResponse
    var city: String
    
    func formattedTimeZone(_ timezoneOffset: Int) -> String {
        let hours = timezoneOffset / 3600
        let minutes = abs((timezoneOffset % 3600) / 60)
        return String(format: "GMT%+d:%02d", hours, minutes)
    }
    
    @Environment(\.presentationMode) var presentationMode

    var body: some View {
        VStack {
            Text("Weather for \(city)")
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding()

            Text("Temperature: \(weather.main.temp, specifier: "%.1f")°C")
                .font(.system(size: 40))
                .fontWeight(.semibold)
                .padding(.top)
            
            Text("Condition: \(weather.weather.first?.description ?? "Unknown")")
                .font(.title2)
                .padding(.top)
            
            Text("Humidity: \(weather.main.humidity)%")
                .font(.title3)
                .padding(.top)
            
            Text("Pressure: \(weather.main.pressure) hPa")
                .font(.title3)
                .padding(.top)

            Text("Wind Speed: \(weather.wind.speed, specifier: "%.1f") m/s")
                .font(.title3)
                .padding(.top)
            
            Text("Time Zone: \(formattedTimeZone(weather.timezone))")
                .font(.title3)
                .padding(.top)

            Button("Back to City Selection") {
                presentationMode.wrappedValue.dismiss()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .fontWeight(.bold)
            .cornerRadius(10)
            .shadow(radius: 5)
            .padding(.bottom)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .foregroundStyle(Color.white)
        .padding()
        .background(LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom))
        .edgesIgnoringSafeArea(.all)
    }
}
