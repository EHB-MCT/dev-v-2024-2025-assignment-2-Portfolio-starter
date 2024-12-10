# Challenge 2

This is a simple journal entry app that records the human facial emotions of the user when saving journal entries. These will later be used to make data charts to analyse the overall mood of a person in their life.

## Features

### 1. **See All Entries**
The **See All Entries** feature allows users to view a comprehensive list of all frustration entries recorded in the app. These entries can include various topics such as work-related frustrations, personal challenges, or other aspects that affect the user's well-being. 

**Key Points:**
- Users can view a complete list of frustration entries.
- Each entry includes relevant details such as the frustration topic, a description, and the timestamp when the frustration was recorded.
- The entries are fetched dynamically from the backend, ensuring the list is always up-to-date with the latest data.

### 2. **Moods**
The **Moods** feature enables users to track and view their emotional state over a specified period. This feature visualizes the user's mood entries over the past five days and provides insights into the patterns or trends in their emotional well-being.

**Key Points:**
- Users can see mood data for the last 5 days.
- Mood entries are displayed in a grid format, showing the date and corresponding mood (e.g., happy, sad, stressed, etc.).
- The moods are color-coded for quick recognition (e.g., green for happy, red for frustrated).
- The moods are linked to the corresponding frustrations, providing a context for each emotional state.
- Data is gathered from mood entries, which can be viewed alongside frustration-related data for deeper analysis.

### 3. **Frustrations**
The **Frustrations** feature allows users to log, filter, and view frustrations they have experienced over time. This feature is valuable for reflecting on the sources of stress or negative emotions and provides a clear understanding of recurring frustrations. Users can select specific topics to filter frustrations or view all frustrations in general.

**Key Points:**
- Users can view frustrations categorized by topic (e.g., work, personal life, etc.).
- A picker control allows users to select which topic to filter frustrations by (e.g., "All", "Work", "Family").
- Frustrations include detailed information, such as the topic, description, and timestamp.
- The app also identifies the most frequent frustration topic, helping users recognize recurring patterns.
- Frustrations can be linked to potential solutions (e.g., external resources or guides to help users address their frustrations).

### 4. **Enter Entry**
The **Enter Entry** feature allows users to record new frustration entries with details such as the topic, description, and timestamp. This feature enables users to capture their feelings and challenges at any given time, contributing to the data used for tracking moods and frustrations.

**Key Points:**
- Users can add new entries by selecting a topic, describing their frustration, and setting a timestamp.
- The entries are automatically saved to the backend and are available for future reference and analysis.
- This feature provides a way for users to track their emotional and mental well-being by documenting frustrations and linking them to mood entries.
- Users can enter frustrations related to various topics like "Work," "Personal Life," or any other custom topics they wish to log.

## Data recording

### The data sent to the API is the following: 

| Name        | Description                                                                     | Type                  |
| ----- | ----- | ----- |
| id          | Id of each entry                                                                | UUID                  |
| title		  | Title of the entrypoint								                            | String                |
| topic       | Topic of the journal entrypoint                                                 | String                |
| text        | The text content of the journal entry written by the users						| String                |
| timestamp   | Time and date of the entry (date/month/year - hours:minutes:seconds - timezone) | Date                  |
| sessionMood | A general description of the user’s mood during the sessionMood					| String                |

### Note:

This model is also used as another name: EntryModel in the case of fetching entries. This is done to ensure no problems arise when fetching or posting entries to the database.

### The following model is used to keep track of the emotions of a person as well as calculate the overall mood of a person:

| Name | Description | Type |
| ----- | ----- | ----- |
| smile | Score of the blendshape 'smile' (0 to 1) | Double |
| frown | Score of the blendshape 'frown' (0 to 1) | Double |
| raisedEyeBrow | Score of the blendshape 'raisedEyeBrow' (0 to 1) | Double |
| jawOpen | Score of the blendshape 'jawOpen' (0 to 1) | Double |

## Installing

Clone the repository on your machine directly from the Xcode app in a dedicated folder on your machine. If there are any problems, please submit a ticket or pull request with the problems.

### Warning

Please add the following in the Info.plist file of the project to be able to use ARKit and the camera features of the app:

```xml
<key>NSCameraUsageDescription</key>
<string>We use the camera to track your facial expressions while journaling.</string>
<key>NSFaceIDUsageDescription</key>
<string>This app uses Face ID to gather subtle emotional data during journaling.</string>
```

## Requirements

- Xcode 16.0 or higher

- Base iOS packages (installed with or through Xcode)

- Swift 6.0 or higher

- Firebase package dependencies (firebase, firestore)

## Contributions

Please document your code correctly by adding comments at the top describing the function of the file as well as inline comments to further enhance the comprehension of the code by newcomers.

If you add elements to an already existing module, please use "//MARK:" to organize and mark sections of code that were added, "//TODO:" to indicates a task or reminder for future implementation, "FIXME:" to mark parts of the code that need fixing and "MARK: -" to add a separator (horizontal line in Xcode) for better visual separation between sections

## Guidelines

No exceptions will be made and no quarters will be given to people disrespecting each other. There will be no second chances as well. Minor offenses will be given a fair warning first as well as a time out of 1 month. Bigger offenses will be met with a permanent ban with no option to appeal. Swearing and insults towards others in any way, shape or form are strictly forbidden and regarded as major offenses. 

## Data flow

The data within the app (both from and to API's) follow the following route: Service <---> Model <---> ViewModel <---> View(s). The double arrows signify the fact that this gan go both ways (data to the firestore API for example). Data from an API in JSON form can be decoded directly into a Model with a decoder (see WeatherService.swift). Data towards the Firestore database can be put inside a collection (see FirestoreService.swift) to get passed through, the conversion to JSON is not needed thanks to the package dependencies. 

## Services

Project files that handle the connection to databases or API calls. This folder is also for "Controllers" as they work in the same way and just have a different name (depends on your way of working).

Be sure to import "Foundation".

Use  upper CamelCase to name files. Name them as services in the folder as well. In case you make multiple services for your contribution, put them in a subfolder named according to the use of the services. Use upper CamelCase for the naming of the folder as well.

## Models

Models are used to parse data into from the database or API using the services. View them as objects or templates for the data to transform into.

Use upper CamelCase to name files. Name them according to the type of "object" or use they will have.

Use tags "Codable" and "Identifiable" to make the models discoverable (ex: "struct Pokemon: Codable, Identifiable") and import "Foundation".

In case multiple models are being made for a single purpose, put them together in a subfolder named according to the models or the use case of them. Use upper CamelCase for the naming of the folder as well.

## ViewModels

Use ViewModels to keep the views lightweight and focused on rendering. They handle the transformation of data and the interactions made by users (ex: button clicked calls an API) and connect to services. Some ViewModels may be shared or abstract based and can be put in the Shared folder. Please be sure to put multiple ViewModels that are linked inside a subfolder EVEN if they are in the shared folder.

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

## Sources

- [ARKit Blendschapes](https://arkit-face-blendshapes.com) - Used to figure out and decide which blendshapes are used in the app.
- [Apple ARKit documentation](https://developer.apple.com/documentation/arkit) - Used to implement the ARKit side of the app following conventions stated in the documentation as much as possible.
- [ChatGPT](https://chatgpt.com/share/6735ee26-2c44-8002-aaee-08c2216764a3) - Used to resolve an issue that prevented the app from passing data to the Firebase API.
- [ChatGPT](https://chatgpt.com/share/6735f01c-421c-8002-9732-374707d6d757) - Used to find the language of a code snippet inside this Readme file (I did not recognize it...).
- [ChatGPT](https://chatgpt.com/share/67581d9f-6b48-8002-b144-8a2d6baaaf85) - Used to resolve an issue in a mindset of preventing a full breakdown of the app.
- [Firebase database](https://firebase.google.com/docs/firestore) - Used to implement the logic in FirebaseService.swift and to ensure the modularity of the functions.

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