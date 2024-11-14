//
//  Content.swift
//
//
//  Created by Guillaume Dochy on 08/11/2024.
//

import SwiftUI

/// The main content view for the application.
/// `ContentView` serves as the root view and displays the `JournalEntryView` for journal entry input.
struct ContentView: View {
    
    /// The view body displaying `JournalEntryView`.
    var body: some View {
        JournalEntryView()
    }
}

#Preview {
    ContentView()
}
