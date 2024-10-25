# Challenge 2

This app is a simple weather app that records the demanded data. Every time someone requests the weather for a city, the data gets sent to a firebase database. 

### Data recording

The data sent to the API is the following: 
- Date & time of the request
- City for which the weather was requested
- Temperature recorded
- Wind speed
- Condition
- Humidity
- Pressure
- Time zone of the city

This data is recorded to find out which cities have the most unpredictable weather, what kind of weather is the most common in those cities and at what time of day in the specific time zone the users request to try and find patterns depending on the weather conditions as well (ex: the most requested city is london, at 7 AM and when it is cloudy).

## Installing

Clone the repository on your machine directly from the Xcode app in a dedicated folder on your machine. If there are any problems, please submit a ticket or pull request with the problems.

## Requirements

- Xcode 16.0 or higher

- Base iOS packages (installed with or through Xcode)

- Swift 6.0 or higher

- Firebase package dependencies (firebase, firestore)

## Contributions

Please document your code correctly by adding comments at the top describing the function of the file as well as inline comments to further enhance the comprehension of the code by newcomers.

If you add elements to an already existing module, please use "//MARK:" to organize and mark sections of code that were added, "//TODO:" to indicates a task or reminder for future implementation, "FIXME:" to mark parts of the code that need fixing and "MARK: -" to add a separator (horizontal line in Xcode) for better visual separation between sections

## Guidelines

Don't be a bitch with a small ego. Everybody can make mistakes. Corrections with the use of verbal abuse as well as threats will not be tolerated and the guilty will be banned without a warning or second chance.

## Controllers

Project files that handle the connection to databases or API calls. This folder is also for "Services" as they work in the same way and just have a different name (depends on your way of working).

Be sure to import "Foundation".

Use  upper CamelCase to name files. Name them as controllers in the folder as well. In case you make multiple controllers for your contribution, put them in a subfolder named according to the use of the controllers. Use upper CamelCase for the naming of the folder as well.

## Models

Models are used to parse data into from the database or API using the controllers. View them as objects or templates for the data to transform into.

Use upper CamelCase to name files. Name them according to the type of "object" or use they will have.

Use tags "Codable" and "Identifiable" to make the models discoverable (ex: "struct Pokemon: Codable, Identifiable") and import "Foundation".

In case multiple models are being made for a single purpose, put them together in a subfolder named according to the models or the use case of them. Use upper CamelCase for the naming of the folder as well.

## ViewModels

Use ViewModels to keep the views lightweight and focused on rendering. They handle the transformation of data and the interactions made by users (ex: button clicked calls an API) and connect to controllers. Some ViewModels may be shared or abstract based and can be put in the Shared folder. Please be sure to put multiple ViewModels that are linked inside a subfolder EVEN if they are in the shared folder.

Make sur to import "Combine" and "Foundation".

Use upper CamelCase to name the files according to their use (name of the View they are linked to/ used for + "Model"). In case a contribution requires multiple ViewModels/ Views, put these in a subfolder named after the use case. Also, use upper CamelCase to name the folder.

## Views

Use Views to display a specific screen using SwiftUI. Views can also be used to make reusable UI (ex: NavBar). Reusable Views are to be put in the Shared subfolder.

Be sure to import and use "SwiftUI".

Use upper CamelCase to name Views according to their use or what they render. In case multiple Views are made for a single use case/ contribution, please put them in a subfolder named accordingly to the use case. Also, use upper CamelCase to name the subfolder.

## Other

You can put configuration files like plist, xcconfig and other configuration files for different build settings. Also, you can put License Files, Text files (ex: README files mentioned inside the code), Shell Scripts, Custom data Files (like JSON, XML or custom binary data files), Third-Party Files or External Files (ex: third-party libraries or SDKs manually added that do not fit in the Frameworks or Libraries folder) and Miscellaneous Files (documentations, CSV data, sample data for testing).

#### Put every file type in a dedicated subfolder named with upper CamelCase after the type of files stored in it.

DO NOT STORE SOURCE CODE INSIDE OF THIS FOLDER! (ex: .swift, .m, .h, .cpp files). Also do not put Storyboards (.storyboard/ .xib files), Views (and SwiftUI files), Frameworks, Libraries, Derived Data or Build Products and Bundle Files (.strings).

## App

This folder is used for the entrypoint of the app. At the moment (07 October 2024) the app does not have an App configuration file, in case it needs to be added, this is where it should be.

## Assets

Use the Assets folder to store images, icons, logo's and other media that are not stored online in personal database(s) or API(s) but are needed inside Views.

## Preview Content

If this folder is not directly in your directory, this may be because it was not uploaded to github. This folder is used for preview items inside of Xcode without needing to build the app constantly. If you need this folder, please add it to the gitignore file if it is detected by github.

## Tests

Put all types of tests inside the dedicated subfolder. In case you wish to add a kind of test that does not have a dedicated subfolder, please make a subfolder for it. Be sure to use upper CamelDase when naming the tests and subfolders.

## License

MIT License

Copyright (c) 2024 Guillaume Dochy, Mitch Saah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Authors

Guillaume Dochy