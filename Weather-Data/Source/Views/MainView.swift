//
//  MainView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 16/10/2024.
//

import SwiftUI

struct MainView: View {
    @StateObject private var viewModel = ContentViewModel()
    @State private var city: String = "London"
    @State private var showWeatherDetail: Bool = false

    var body: some View {
        NavigationStack {
            VStack {
                Text("Weather App")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .padding(.top, 40)
                    .foregroundColor(.blue)

                InputView(city: $city, fetchWeather: {
                    if !city.isEmpty {
                        viewModel.fetchWeather(for: city)
                        showWeatherDetail = true
                    }
                })
                .padding(.horizontal)

                Button(action: {
                    if !city.isEmpty {
                        viewModel.fetchWeather(for: city)
                        showWeatherDetail = true
                    }
                }) {
                    Text("Get Weather")
                        .padding()
                        .foregroundColor(.white)
                        .background(Color.blue)
                        .cornerRadius(10)
                }
                .disabled(city.isEmpty)

                .navigationDestination(isPresented: $showWeatherDetail) {
                    WeatherDetailView(
                        weather: viewModel.weather ?? WeatherResponse(
                            name: city, 
                            main: WeatherResponse.Main(temp: 0, humidity: 0, pressure: 0),
                            weather: [WeatherResponse.Weather(description: "Unknown")],
                            wind: WeatherResponse.Wind(speed: 0),
                            timezone: 0
                        ),
                        city: city
                    )
                }

                if viewModel.weather == nil {
                    Text("Enter a city to get weather data.")
                        .foregroundColor(.blue)
                        .padding()
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(.white)
            .edgesIgnoringSafeArea(.all)
        }
        .onChange(of: viewModel.weather) { newWeather in
                    if newWeather != nil {
                        showWeatherDetail = true
                    }
                }
    }
}

#Preview {
    MainView()
}
