//
//  GoogleSearchItem.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 23/12/2024.
//

import Foundation

/// Decodable structure for individual search items.
struct GoogleSearchItem: Decodable {
    let title: String
    let link: String
}
