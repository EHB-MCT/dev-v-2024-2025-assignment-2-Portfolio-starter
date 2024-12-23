//
//  Article.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Model representing an article returned by the Google Custom Search API.
/// The model stores the `title` and `link` of each article.
struct Article: Identifiable {
    let id = UUID()
    let title: String
    let link: String        
}
