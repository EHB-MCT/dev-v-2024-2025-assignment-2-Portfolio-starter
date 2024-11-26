//
//  HomeButton.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 26/11/2024.
//


//
//  HomeButton.swift
//  
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import SwiftUI

/// A reusable button component for the Home screen.
struct HomeButton: View {
    let title: String
    let color: Color

    var body: some View {
        Text(title)
            .frame(maxWidth: .infinity, minHeight: 50)
            .background(color)
            .foregroundColor(.white)
            .cornerRadius(10)
            .font(.headline)
            .padding(.horizontal)
    }
}
