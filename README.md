
# WeatherScraper

An application designed to scrape and store weather forecasts for future analysis and visualization. Built with Node.js, Puppeteer, and MongoDB, this project emphasizes modularity, scalability, and adherence to coding best practices.

---

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Configuration](#configuration)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Conventions](#Conventions)
- [Data Flow](#Data Flow)
---

## Description

WeatherScraper automates the collection of weather forecast data from weather.com using Puppeteer. It saves the scraped data in a MongoDB database, making it accessible for further processing, aggregation, or visualization. This project demonstrates efficient data management and clean code organization to ensure scalability and maintainability.

---

## Features

- **Automated Weather Forecast Scraping**: Extracts temperature, weather conditions, precipitation, wind speed, and day of the week.
- **Database Integration**: Stores weather data in MongoDB using a well-defined Mongoose schema.
- **Reusable Modules**: Modular and reusable code to ensure scalability and maintainability.
- **Configuration-Driven**: Leverages configuration files for flexible app settings and environment management.
- **Future-Ready**: Designed for future integration with data visualization and dynamic updates.

---

## Technologies

- **Scraping**: [Puppeteer](https://pptr.dev/)
- **Backend**: [Node.js](https://nodejs.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Environment Management**: `.env` for sensitive information and `config` for app settings

---

## File Structure

```
/WeatherScraper
  /config
    default.json
  /database
    connectDB.js
    saveWeatherData.js
  /models
    weatherData.js
  /scraping
    getWeatherData.js
    scrapeWeatherData.js
    extractWeatherData.js
  /utils
    formatDate.js
  .env
  .gitignore
  index.js
  README.md
```

- **/config**: Stores configuration files for app settings (e.g., app name, port).
- **/database**: Contains utility scripts for database connection and data storage.
- **/models**: Includes the Mongoose schema for weather data.
- **/scraping**: Manages all scraping logic and data extraction modules.
- **/utils**: Contains helper functions (e.g., `formatDate.js`).
- **index.js**: The main entry point for the application.

---

## Configuration

### App Configuration
Located in `/config/default.json`:
```json
{
  "appName": "WeatherScraper",
  "port": 3000
}
```

### Environment Variables
Defined in a `.env` file:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/weatherData
```

Ensure sensitive credentials are not pushed to version control by including `.env` in `.gitignore`.

---

## Usage

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Start the application**:
    ```bash
    node index.js
    ```

3. **Output**: The scraper will extract weather data and save it in MongoDB.

---

## Roadmap

- [x] Develop basic scraper with Puppeteer
- [x] Integrate MongoDB for data storage
- [ ] Implement data validation and aggregation endpoints
- [ ] Add data visualization capabilities

---

## Contributing
Feel free to contribute to this project! Create a pull request for new features or improvements.

## Documentation

- **Data Flow**: A visual representation of the scraping and storage process is included in the `/docs` folder.
- **Design Patterns**: Details on modularity and reusable patterns are documented in the `/docs/design_patterns.md`.
- **API Endpoints**: (Future) Documentation for API routes will be provided in `/docs/api_endpoints.md`.

---

## Conventions

- **File and Folder Naming**: All files and folders use camelCase for naming to maintain consistency and clarity. For example, files like `connectDB.js`, `getWeatherData.js`, `scrapeWeatherData.js`, etc., adhere to this naming convention.

- **Environment Variables**: Sensitive information such as API keys and database credentials are stored in the `.env` file and are accessed using `process.env` to ensure secure handling of these values.

- **Modularization**: The project is organized into logical modules and components to enhance code reusability and maintainability. Functions and modules are kept focused on a single responsibility.

- **Database Naming**: Database-related files are placed in the `/database` folder, and each file handles a specific responsibility (e.g., connecting to the database, saving weather data).

---

## Data Flow

The data flow in this project involves multiple stages, from scraping the weather data to storing it in the database, with necessary validation and formatting applied along the way.

### 1. **Scraping Data**
   - The scraping process begins with the `/scraping` folder. The main function responsible for gathering weather data is `scrapeWeatherData.js`, which calls helper functions like `getWeatherData.js` to fetch data from external sources.
   - Once the data is fetched, it's passed through `extractWeatherData.js` to clean and structure it for further processing.

### 2. **Data Validation and Transformation**
   - The scraped data is then passed to utility functions, such as `formatDate.js` in the `/utils` folder, which formats timestamps into readable date formats. This ensures that all data is in the correct format before being stored.

### 3. **Saving Data to the Database**
   - After validation and formatting, the data is saved to the database. This is handled in the `/database/saveWeatherData.js` file, which stores the structured weather data in a database (e.g., MongoDB or SQL) for future use.

### 4. **Database Connection**
   - The connection to the database is managed by `connectDB.js` in the `/database` folder. This file ensures that the app is connected to the database at the start of the application.

### 5. **Environment Configuration**
   - All environment-related configurations, including API keys and database URLs, are stored securely in the `.env` file. These variables are accessed throughout the project to ensure proper configuration across different environments.


## License

This project is licensed under the [MIT License](LICENSE).
```
