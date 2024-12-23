//
//  ArticleListViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Combine
import Foundation

/// ViewModel responsible for fetching and managing articles related to a specific topic.
/// The ViewModel interacts with `GoogleSearchService` to get articles and tracks loading/error states.
class ArticleListViewModel: ObservableObject {
    @Published var articles: [Article] = []
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?           

    private let googleSearchService: GoogleSearchService

    /// Initializes the ViewModel with an optional `GoogleSearchService` for dependency injection.
    init(googleSearchService: GoogleSearchService = GoogleSearchService()) {
        self.googleSearchService = googleSearchService
    }

    /// Fetches articles related to a given topic.
    /// - Parameter topic: The topic to search articles for.
    func fetchArticles(for topic: String) {
        guard !topic.isEmpty else { return }

        isLoading = true
        errorMessage = nil

        googleSearchService.fetchArticles(for: topic) { [weak self] result in
            DispatchQueue.main.async {
                self?.isLoading = false
                switch result {
                case .success(let articles):
                    self?.articles = articles
                case .failure(let error):
                    self?.errorMessage = error.localizedDescription
                }
            }
        }
    }
}
