//
//  Article.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Model for an article returned by the Google Custom Search API.
struct Article: Identifiable {
    let id = UUID()
    let title: String
    let link: String
}
