//
//  GoogleSearchService.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// A service class to interact with the Google Custom Search API.
/// This service is responsible for fetching articles related to a specific topic from the Google Search Engine.
class GoogleSearchService {
    private let apiKey: String
    private let searchEngineId: String

    /// Initializes the service by fetching the API key and Search Engine ID from the Info.plist.
    init() {
        guard let apiKey = Bundle.main.object(forInfoDictionaryKey: "GoogleAPIKey") as? String,
              let searchEngineId = Bundle.main.object(forInfoDictionaryKey: "GoogleSearchEngineID") as? String else {
            fatalError("Google API Key or Search Engine ID not found in Info.plist")
        }
        self.apiKey = apiKey
        self.searchEngineId = searchEngineId
    }

    /// Fetches articles for a given topic using the Google Custom Search API.
    /// - Parameters:
    ///   - topic: The topic to search articles for.
    ///   - completion: A closure that returns a `Result` with either an array of `Article` or an error.
    func fetchArticles(for topic: String, completion: @escaping (Result<[Article], Error>) -> Void) {
        let baseURL = "https://www.googleapis.com/customsearch/v1"
        let query = "\(baseURL)?key=\(apiKey)&cx=\(searchEngineId)&q=\(topic)"

        guard let url = URL(string: query) else {
            completion(.failure(NSError(domain: "Invalid URL", code: 400, userInfo: nil)))
            return
        }

        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
                return
            }

            guard let data = data else {
                completion(.failure(NSError(domain: "No data received", code: 404, userInfo: nil)))
                return
            }

            do {
                let result = try JSONDecoder().decode(GoogleSearchResponse.self, from: data)
                let articles = result.items.map { Article(title: $0.title, link: $0.link) }
                completion(.success(articles))
            } catch {
                completion(.failure(error))
            }
        }.resume()
    }
}
