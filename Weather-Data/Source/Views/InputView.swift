//
//  InputView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 16/10/2024.
//

import SwiftUI

struct InputView: View {
    @Binding var city: String
    let fetchWeather: () -> Void

    var body: some View {
        VStack {
            TextField("Enter city name", text: $city)
                .padding()
                .background(Color.white)
                .cornerRadius(5)
                .padding(.horizontal)
                .textFieldStyle(RoundedBorderTextFieldStyle())
        }
    }
}
