//
//  RegionSelectionViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 25/10/2024.
//

import FirebaseFirestore
import SwiftUI

class RegionSelectionViewModel: ObservableObject {
    @Published var navigateToMainView = false
    private let firestore = Firestore.firestore()
    @AppStorage("hasSelectedRegion") private var hasSelectedRegion: Bool = false
        @Published var selectedRegion: String? = nil

        func selectRegion(_ region: String) {
            selectedRegion = region
            saveRegionSelection(region: region)
            hasSelectedRegion = true
        }

    func saveRegionSelection(region: String) {
        let userLog = firestore.collection("user_logs").document()
        
        userLog.setData(["region": region, "timestamp": Timestamp()]) { error in
            if let error = error {
                print("Error saving region selection: \(error.localizedDescription)")
            } else {
                DispatchQueue.main.async {
                    self.navigateToMainView = true
                }
            }
        }
    }
}
