//
//  ArticleListViewModel.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//


import Combine
import Foundation

/// ViewModel responsible for fetching and managing articles related to a specific topic.
class ArticleListViewModel: ObservableObject {
    @Published var articles: [Article] = []
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    private let googleSearchService: GoogleSearchService

    init(googleSearchService: GoogleSearchService = GoogleSearchService()) {
        self.googleSearchService = googleSearchService
    }

    /// Fetches articles for the given topic.
    /// - Parameter topic: The topic to fetch related articles for.
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
