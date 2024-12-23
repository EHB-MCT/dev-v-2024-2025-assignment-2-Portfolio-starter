//
//  GoogleSearchResponse.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Decodable structure representing the response returned from the Google Custom Search API.
/// Contains an array of `GoogleSearchItem` which represent the search results.
struct GoogleSearchResponse: Decodable {
    let items: [GoogleSearchItem]   
}
