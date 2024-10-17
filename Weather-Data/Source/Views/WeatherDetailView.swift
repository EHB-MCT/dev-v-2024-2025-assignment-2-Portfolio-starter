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

    var body: some View {
        VStack {
            Text("Weather for \(city)")
                .font(.largeTitle)
                .fontWeight(.bold)
                .padding()
                .foregroundStyle(.white)

            Text("Temperature: \(weather.main.temp, specifier: "%.1f")°C")
                .font(.system(size: 40))
                .fontWeight(.semibold)
                .padding()
                .foregroundStyle(.white)

            Text("Condition: \(weather.weather.first?.description ?? "Unknown")")
                .font(.title2)
                .padding()
                .foregroundStyle(.white)
            
            NavigationLink(destination: ContentView()) {
                Text("Back to City Selection")
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
        .background(LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom))
        .edgesIgnoringSafeArea(.all)
    }
}
