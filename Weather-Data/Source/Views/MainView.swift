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
            NavigationView {
                VStack {
                    Text("Weather App")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .padding()
                        .foregroundColor(.white)

                    InputView(city: $city, fetchWeather: {
                        if !city.isEmpty {
                            viewModel.fetchWeather(for: city)
                        }
                    })
                    .padding()

                    NavigationLink(destination: WeatherDetailView(weather: viewModel.weather ?? WeatherResponse(main: Main(temp: 0), weather: [Weather(description: "Unknown")]), city: city), isActive: $showWeatherDetail) {
                        EmptyView()
                    }

                    if viewModel.weather == nil {
                        Text("Enter a city to get weather data.")
                            .foregroundColor(.white)
                            .padding()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(LinearGradient(gradient: Gradient(colors: [Color.blue, Color.purple]), startPoint: .top, endPoint: .bottom))
                .edgesIgnoringSafeArea(.all)
                .onChange(of: viewModel.weather) { newWeather in
                    if newWeather != nil {
                        showWeatherDetail = true
                    }
                }
            }
        }
    }

#Preview {
    MainView()
}
