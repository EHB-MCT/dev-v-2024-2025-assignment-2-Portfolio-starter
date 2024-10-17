//
//  InputView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 16/10/2024.
//

import SwiftUI

struct InputView: View {
    @Binding var city: String
    var fetchWeather: () -> Void

    var body: some View {
        VStack {
            TextField("Enter city name", text: $city)
                .textFieldStyle(PlainTextFieldStyle())
                .padding()
                .background(Color.white.opacity(0.7))
                .cornerRadius(10)
                .shadow(radius: 5)

            Button("Get Weather") {
                fetchWeather()
            }
            .padding()
            .background(Color.white)
            .foregroundColor(Color.blue)
            .fontWeight(.bold)
            .cornerRadius(10)
            .shadow(radius: 5)
        }
        .padding()
    }
}
