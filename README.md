# WeatherScraper

An application that scrapes weather forecasts from a weather website (weather.com) using a web scraper (with Puppeteer) and stores the data in a MongoDB database.

## Description

This project uses a web scraper (with Puppeteer) to collect weather forecast data for the upcoming days from weather.com. The scraper collects data such as temperature, day of the week, and other relevant weather information. This data is then saved to a MongoDB database for further processing and analysis.

## Features

- **Weather Forecast Scraping**: The scraper collects data such as temperature, day of the week, weather conditions, precipitation, and wind speed from a specific weather website.
- **Store Data in MongoDB**: The collected weather data is saved into a MongoDB database.
- **Puppeteer Configuration**: The scraper uses Puppeteer to load the website and extract data.
- **Backend Server**: The application runs on a Node.js backend that manages the scraper and processes the data.

## Purpose

The purpose of this project is to build an automated weather forecast scraper that fetches data from a public website, saves it in a MongoDB database, and can later be used for analysis or visualization of weather forecasts.

## Technologies

- **Scraping**: Puppeteer (Node.js)
- **Database**: MongoDB for storing data
- **Backend**: Node.js for managing the scraper and server
- **Configuration**: Configuration file for app settings

## Roadmap

1. Set up the basic project with Node.js, Puppeteer, and MongoDB.
2. Develop the scraper to collect weather forecasts.
3. Save collected data into a MongoDB database.
4. (Future) Visualization of the weather forecasts.
5. (Future) Additional functionality for dynamic weather updates.

## Configuration

The project uses a configuration file (`config/default.json`) for app settings such as the app name and port. The file looks like this:

```json
{
  "appName": "WeatherScraper",
  "port": 3000
}
```

Additionally, a `.env` file is used for managing sensitive information like the MongoDB URI:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@weatherdatacluster.bbhmg.mongodb.net/weatherData?retryWrites=true&w=majority
```

## File Structure

The project's file structure looks like this:

```
/project
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
  .env
  .gitignore
  index.js
```

### Explanation of the file structure

- **/config**: Contains the configuration file with app settings such as the port and app name.
- **/database**: Contains files for connecting to the database (`connectDB.js`) and saving weather data to MongoDB (`saveWeatherData.js`).
- **/models**: Contains the Mongoose model (`weatherData.js`) for saving weather forecasts to the MongoDB database.
- **/scraping**: Contains the files that drive the web scraper (`getWeatherData.js` and `scrapeWeatherData.js`).
- **.env**: Contains sensitive environment variables such as the MongoDB URI.
- **.gitignore**: The files and folders that should not be pushed to the git repository (e.g., node_modules).
- **index.js**: The main file of the application where the server runs and the scraper is called.

## Usage

1. Install the required dependencies:
    ```bash
    npm install
    ```

2. Run the application:
    ```bash
    node index.js
    ```

The scraper will fetch weather forecasts and save them to the MongoDB database.

## Contributions

Feel free to contribute to this project! Create a pull request for new features or improvements.
