# wift & MVVM Coding Conventions

This document outlines coding conventions for Swift projects, including those following the MVVM (Model-View-ViewModel) architecture.

## Swift General Conventions

### Code Formatting

	•	Indentation: Use 4 spaces per level.
	•	Line Length: Limit lines to 120 characters.
	•	Braces: Place opening braces on the same line.
	•	Whitespace:
	•	Avoid trailing whitespaces.
	•	Include one blank line between functions.
	•	Minimize unnecessary blank lines within functions.

### Naming Conventions

	•	Classes/Structs/Enums: Use PascalCase.
Example:

```swift
class UserProfile { }
struct WeatherData { }
```

	•	Variables/Properties/Functions: Use camelCase.
Example:

```swift
var userName: String
func fetchWeatherData() { }
```

	•	Constants: Use camelCase prefixed with let.
Example:

```swift
let maxRetries = 3
```

	•	Enums: Use singular names and camelCase for cases.
Example:

```swift
enum Theme {
    case light
    case dark
}
```


### Access Control

Use access modifiers (private, fileprivate, internal, public, open) to encapsulate code.
Example:

```swift
private var userToken: String
```

### Optionals

Use optionals (?) sparingly. Prefer guard or if let to unwrap values.
Example:

```swift
guard let user = currentUser else { return }
```

### Closures

Use trailing closure syntax when the closure is the last parameter.
Example:

```swift
dataFetcher.fetchData { result in
    print(result)
}
```

### Comments

	•	Use // for single-line comments and /* */ for multi-line comments.
	•	Document public APIs with /// to generate documentation.
Example:

```swift
/// Fetches weather data for the specified city.
/// - Parameter city: The name of the city.
func fetchWeather(for city: String) { }
```


### Protocols

Protocol names should describe functionality or use adjectives.
Example:

```swift
protocol Drivable { }
protocol Codable { }
```

### Error Handling

Use do-catch for throwing functions.
Example:

```swift
do {
    try someFunction()
} catch {
    print(error)
}
```

## MVVM Conventions

### File Structure

Organize files into distinct groups:

ProjectName/
├── Models/
├── Views/
├── ViewModels/
├── Services/
├── Resources/
└── App/

### Responsibilities

	•	Model: Represents raw data.
Example:

```swift
struct Weather {
    let temperature: Double
    let condition: String
}
```

	•	View: Handles UI representation.
Example:

```swift
struct WeatherView: View {
    @ObservedObject var viewModel: WeatherViewModel

    var body: some View {
        Text(viewModel.weatherDescription)
    }
}
```

	•	ViewModel: Mediates between Model and View. Manages logic and state.
Example:

```swift
class WeatherViewModel: ObservableObject {
    @Published var weatherDescription: String = ""

    func fetchWeather() {
        // Fetch data and update weatherDescription
    }
}
```


### Data Binding

Use @Published in ViewModel and @ObservedObject or @StateObject in Views for binding.
Example:

```swift
@ObservedObject var viewModel = WeatherViewModel()
```

### Dependency Injection

Pass dependencies (e.g., services) into ViewModel via initializer injection.
Example:

```swift
init(weatherService: WeatherService) {
    self.weatherService = weatherService
}
```

### Networking in MVVM

Keep networking logic in separate service files, not in ViewModel.
Example:

```swift
class WeatherService {
    func fetchWeather(for city: String, completion: @escaping (Weather) -> Void) {
        // Networking logic
    }
}
```

### Testing

Mock dependencies for ViewModel unit tests.
Example:

```swift
let mockService = MockWeatherService()
let viewModel = WeatherViewModel(service: mockService)
```

### Navigation

Handle navigation logic in ViewModel to decouple Views.
Example:

```swift
NavigationLink(destination: DetailView(viewModel: detailViewModel)) {
    Text("Go to Details")
}
```

### Best Practices

	1.	Write reusable components for Views.
	2.	Avoid tightly coupling ViewModels with Views.
	3.	Keep Views “dumb”—they should only present data from ViewModels.
	4.	Use Combine or async-await for handling asynchronous tasks.
	5.	Keep ViewModels small and focused.

### Example Folder Structure

ProjectName/
├── Models/
│   └── Weather.swift
├── Views/
│   ├── WeatherView.swift
│   └── DetailView.swift
├── ViewModels/
│   ├── WeatherViewModel.swift
│   └── DetailViewModel.swift
├── Services/
│   └── WeatherService.swift
├── Resources/
│   ├── Images/
│   ├── Colors/
│   └── Strings/
└── App/
    ├── AppDelegate.swift
    └── SceneDelegate.swift
