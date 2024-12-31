# WeatherScraper

An application designed to scrape and store weather forecasts for future analysis and visualization. Built with Node.js, Puppeteer, MongoDB, and Express, this project emphasizes modularity, scalability, and adherence to coding best practices, with a new focus on data visualization.

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
- [Conventions](#conventions)
- [Data Flow](#data-flow)
- [License](#license)
- [Sources](#sources)

---

## Description

WeatherScraper automates the collection of weather forecast data from weather.com using Puppeteer. It saves the scraped data in a MongoDB database and presents the data visually using various data visualization techniques. This project now integrates Express for serving data and static files, allowing for a smooth user experience at [http://localhost:3000/](http://localhost:3000/). It is designed for both data scraping and visualization, with a focus on scalability and maintainability.

---

## Features

- **Automated Weather Forecast Scraping**: Extracts temperature, weather conditions, precipitation, wind speed, and day of the week from weather.com.
- **Database Integration**: Stores weather data in MongoDB using a well-defined Mongoose schema.
- **Data Visualization**: Displays weather data dynamically enabling better insights and analysis.
- **Express Server**: Uses Express to serve both data and static files, including the front-end components.
- **Reusable Modules**: Modular and reusable code to ensure scalability and maintainability.
- **Configuration-Driven**: Leverages configuration files for flexible app settings and environment management.
- **Future-Ready**: Designed for future integration with real-time weather data and user-driven customization.

---

## Technologies

- **Scraping**: [Puppeteer](https://pptr.dev/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Environment Management**: `.env` for sensitive information and `config` for app settings
- **Static Files**: Front-end static files served from `/public`

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
  /public
    /css
      reset.css
      master.css
      style.css
      media.css
    /js
      script.js
      showWeatherData.js
    /pages
      visualisation.html
    index.html  
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
- **/public**: Serves static assets like CSS, JavaScript files, and maps for the front-end.
  - **/css**: Contains the main CSS files (`reset.css`, `style.css`, `master.css`, `media.css`).
  - **/js**: Contains JavaScript files used for front-end interactivity (`script.js`) and data showing in (`showWeatherData.js`)
- **/server**: Contains Express-related server files.
  - **routes.js**: The main Express server file that handles routes, serves static files, and manages API endpoints.
- **index.js**: The main entry point for the application.
- **README.md**: Project documentation.

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

## Database Configuration

The application uses MongoDB Atlas as its database. To configure:

    1. Create a MongoDB Atlas account
    2.  Create a new cluster
    3.  Add your IP address to the IP whitelist
    4.  Create a database user
    5.  Update the .env file with your database password


## Usage

1. **Install dependencies**:
    ```bash
    npm install
    ```

2. **Start the application**:
    ```bash
    node index.js
    ```

3. **Access the application**: Visit [http://localhost:3000/](http://localhost:3000/) to interact and view with scraped weather data.

4. **Output**: The scraper will extract weather data and save it in MongoDB. The data will also be served via Express, where you can visualize it.

## API Endpoints
``` GET /api/weather-data - Retrieve all weathers ```
---

## Roadmap

- [x] Develop basic scraper with Puppeteer
- [x] Integrate MongoDB for data storage
- [x] Set up Express server for serving data and static files
- [x] Add data visualization capabilities
- [x] Add a frontend for better user experience 

---

## Contributing
Feel free to contribute to this project! Create a pull request for new features or improvements.

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

### 5. **Serving Data and Visualization**
   - The data is served using the Express server from `/server/routes.js`, where it's rendered dynamically using css. The front-end components are located in the `/public` folder.

### 6. **Environment Configuration**
   - environment-related configurations, like database URLs, are stored securely in the `.env` file. These variables are accessed throughout the project to ensure proper configuration across different environments.

---


## License

This project is licensed under the [MIT License](LICENSE).

---

## Sources
- [Meyerweb CSS Reset](https://meyerweb.com/eric/tools/css/reset/)
- [CSS Tips](https://www.webfx.com/blog/web-design/css-tip-1-resetting-your-styles-with-css-reset/)

### JavaScript & Node.js Conventions
- **[JavaScript Standard Style Guide](https://standardjs.com/)**: A guide for writing consistent and error-free JavaScript code.
- **[Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)**: A comprehensive collection of best practices for writing maintainable Node.js applications.

### File and Folder Naming Conventions
- **[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)**: A widely adopted guide for JavaScript conventions, including file and folder naming.

### Modularization & Code Organization
- **[Node.js Documentation on Modules](https://nodejs.org/dist/latest-v16.x/docs/api/modules.html)**: Official documentation for organizing code into reusable Node.js modules.

### Data Flow & Architecture
- **[MVC Pattern in Node.js](https://scotch.io/tutorials/using-the-model-view-controller-pattern-with-node-js)**: A tutorial on how to implement the MVC pattern for organizing code in Node.js.
---