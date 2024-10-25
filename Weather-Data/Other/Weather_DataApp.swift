//
//  Weather_DataApp.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import SwiftUI
import Firebase

@main
struct Weather_DataApp: App {
    @AppStorage("hasSelectedRegion") private var hasSelectedRegion: Bool = false

    init() {
            FirebaseApp.configure()
        }
    
    var body: some Scene {
        WindowGroup {
            if hasSelectedRegion {
                MainView()
            } else {
                RegionSelectionView()
            }
        }
    }
}
