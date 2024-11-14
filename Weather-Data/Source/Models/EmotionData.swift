//
//  EmotionData.swift
//   
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import Foundation

/// A data model representing various emotion metrics captured during an eyetracking session.
/// `EmotionData` holds quantitative measurements for different facial expressions,
/// such as smile, frown, raised eyebrow, and jaw open.
///
/// Each property represents the intensity of a specific facial expression on a scale from 0.0 to 1.0,
/// where 0.0 indicates no expression and 1.0 indicates maximum intensity.
struct EmotionData {
    
    /// The intensity of the smile expression, ranging from 0.0 (no smile) to 1.0 (maximum smile).
    var smile: Double
    
    /// The intensity of the frown expression, ranging from 0.0 (no frown) to 1.0 (maximum frown).
    var frown: Double
    
    /// The intensity of the raised eyebrow expression, ranging from 0.0 (no eyebrow raise) to 1.0 (maximum raise).
    var raisedEyebrow: Double
    
    /// The intensity of the jaw open expression, ranging from 0.0 (closed jaw) to 1.0 (fully open jaw).
    var jawOpen: Double
}
