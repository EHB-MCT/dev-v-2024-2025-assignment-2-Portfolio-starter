//
//  GoogleSearchResponse.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Decodable response structure for the Google Custom Search API.
struct GoogleSearchResponse: Decodable {
    let items: [GoogleSearchItem]
}
