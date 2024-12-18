## Other

You can put configuration files like plist, xcconfig and other configuration files for different build settings. Also, you can put License Files, Text files (ex: README files mentioned inside the code), Shell Scripts, Custom data Files (like JSON, XML or custom binary data files), Third-Party Files or External Files (ex: third-party libraries or SDKs manually added that do not fit in the Frameworks or Libraries folder) and Miscellaneous Files (documentations, CSV data, sample data for testing).

#### Put every file type in a dedicated subfolder named with upper CamelCase after the type of files stored in it.

DO NOT STORE SOURCE CODE INSIDE OF THIS FOLDER! (ex: .swift, .m, .h, .cpp files). Also do not put Storyboards (.storyboard/ .xib files), Views (and SwiftUI files), Frameworks, Libraries, Derived Data or Build Products and Bundle Files (.strings).