//
//  EntriesListViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 29/11/2024.
//

import SwiftUI
import Combine

/// ViewModel for managing and displaying a list of entries.
class EntriesListViewModel: ObservableObject {
    @Published var entries: [EntryModel] = []
    private let firebaseService = FirebaseService()

    /// Fetches all entries and updates the `entries` property.
    func fetchAllEntries() {
        firebaseService.fetchEntries { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let entries):
                    self?.entries = entries
                case .failure(let error):
                    print("Error fetching entries: \(error.localizedDescription)")
                }
            }
        }
    }
}
