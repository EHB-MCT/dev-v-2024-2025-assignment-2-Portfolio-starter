//
//  GoogleSearchItem.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Decodable structure representing an individual search item returned from the Google Custom Search API.
/// This structure contains the title and link of each search result.
struct GoogleSearchItem: Decodable {
    let title: String
    let link: String        
}
