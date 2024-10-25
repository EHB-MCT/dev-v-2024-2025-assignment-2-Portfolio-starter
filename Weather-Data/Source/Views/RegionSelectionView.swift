//
//  RegionSlecetionView.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 25/10/2024.
//

import SwiftUI

struct RegionSelectionView: View {
    @StateObject private var viewModel = RegionSelectionViewModel()

    var body: some View {
        VStack() {
            Text("Select Your Region")
                            .font(.title)
            HStack {
                Button("NA") { viewModel.selectRegion("NA") }
                .padding()
                .foregroundColor(.white)
                .background(Color.blue)
                .cornerRadius(8)
                
                Button("EU") { viewModel.selectRegion("EU") }
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
                
                Button("AF") { viewModel.selectRegion("AF") }
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
                
                Button("AS") { viewModel.selectRegion("AS") }
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
            }
            
            HStack {
                Button("SA") { viewModel.selectRegion("SA") }
                .padding()
                .foregroundColor(.white)
                .background(Color.blue)
                .cornerRadius(8)
                
                Button("OC") { viewModel.selectRegion("OC") }
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
                
                Button("AN") { viewModel.selectRegion("AN") }
                    .padding()
                    .foregroundColor(.white)
                    .background(Color.blue)
                    .cornerRadius(8)
            }
        }
        .padding()
    }
}

#Preview {
    RegionSelectionView()
}
