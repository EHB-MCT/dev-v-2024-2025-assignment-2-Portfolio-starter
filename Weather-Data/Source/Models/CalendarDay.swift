//
//  CalendarDay.swift
//  Weather-Data
//
//  Created by Guillaume Dochy on 03/12/2024.
//

import Foundation

/// A model representing a single day in the calendar with its associated mood.
struct CalendarDay: Identifiable {
    var id: String { "\(date)" }  
    let date: Date
    let mood: MoodColor
}
