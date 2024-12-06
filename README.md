# Step Tracker and Analysis App

## Overview
The Step Tracker and Analysis App is a web application that tracks the number of steps taken over time and provides data visualizations and analysis of walking trends. The app uses `steps.json` data to generate a daily step count graph using Chart.js, calculate the average number of steps, identify the most active day, and analyze the trend in walking activity.

---

## Features
- **Step Count Visualization**: Displays a line graph of daily steps over a specified period using Chart.js.
- **Data Analysis**: Calculates and displays the average number of steps per day, the most active day, and the trend (increasing, decreasing, or neutral).
- **JSON Data Handling**: Loads step data from a `steps.json` file and generates analysis results, which are saved in a `results.json` file.
- **Responsive UI**: The application is designed to be responsive, providing a smooth user experience across devices.

---

## Installation

### Prerequisites
Make sure you have the following installed:
- **Node.js**: Required for running the `analyze.js` script and for backend tasks (if applicable).
- **npm**: Node package manager to install dependencies.

### Steps to Set Up

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/step-tracker.git
    cd step-tracker
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the `analyze.js` script to analyze your step data:
    ```bash
    node analyze.js
    ```

4. Open `index.html` in your browser to view the step count data and analysis results.

---

## File Structure

step-tracker ├── /data │ └── steps.json # Step data in JSON format ├── /scripts │ ├── /output │ │ └── results.json # Analysis results in JSON format │ ├── script.js # Frontend script for visualizing data │ └── analyze.js # Script for analyzing step data ├── /styles │ └── style.css # CSS for styling the application ├── index.html # HTML file displaying the app ├── README.md # Project documentation └── progress.md # Project progress tracking


---

## How It Works

1. **`steps.json`** contains step data for each day, which is loaded into the app.
2. The **`analyze.js`** script calculates the average number of steps, determines the most active day, and analyzes trends in the step data.
3. **`results.json`** stores the output of the analysis and is used by the frontend (`index.html`) to display the results.
4. **`script.js`** handles fetching data from both `steps.json` and `results.json` to create visualizations and display the analysis results.
5. The app uses **Chart.js** to generate interactive graphs for visualizing step data.

---

## Technologies Used

- **HTML**: Structure of the web page.
- **CSS**: Basic styling for the application.
- **JavaScript**: For data manipulation, analysis, and generating the Chart.js graph.
- **Chart.js**: A JavaScript library for creating interactive data visualizations.
- **Node.js**: For running the server-side script (`analyze.js`) to process data.
- **npm**: For managing dependencies.

---

## Credits

- **ChatGPT** (OpenAI): Provided assistance with generating code and explanations for the analysis script and JavaScript.
- **Chart.js**: The library used for generating the step count graph.
- **Node.js**: Used for running the analysis script (`analyze.js`).
- **npm**: Used for dependency management.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgements

- A special thanks to **ChatGPT** for helping to structure the logic in the `analyze.js` script and for the assistance with debugging.
- Thanks to **Chart.js** for providing a simple and powerful library to visualize the data in a line graph.
