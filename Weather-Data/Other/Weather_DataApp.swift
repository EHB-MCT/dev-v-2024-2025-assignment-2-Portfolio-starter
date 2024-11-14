//
//  Weather_DataApp.swift
//
//
//  Created by Guillaume Dochy on 14/10/2024.
//

import SwiftUI
import Firebase

/// The main entry point of the Journal Face Tracking App. This struct conforms to the `App` protocol,
/// which defines the structure and behavior of the application.
@main
struct JournalApplication: App {

    /// Initializes the Firebase configuration for the app.
    /// This method is called once when the app starts, ensuring that Firebase is properly set up
    /// for use throughout the app. `FirebaseApp.configure()` connects the app to Firebase services.
    init() {
        FirebaseApp.configure()
    }
    
    /// The main scene of the application.
    /// The `body` property defines the main user interface of the app.
    /// `WindowGroup` is a container for the app's windows, displaying `ContentView` as the initial view.
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
