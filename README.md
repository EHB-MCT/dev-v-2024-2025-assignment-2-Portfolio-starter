# Just Lil Guys

Smiski Collection Tracker is a web application that helps users keep track of their Smiski collectibles. It allows users to view the collection progress, see which Smiskis they already own, and explore the most common stores for each series.

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation Instructions](#installation-instructions)
5. [API Endpoints](#api-endpoints)
6. [Usage](#usage)
7. [Sources](#sources)

## Features
- View a list of Smiski series.
- Track the completion percentage of each series in the collection.
- View the most common store associated with each series.
- Toggle whether a specific Smiski is in your collection.
- Store where you got the rare Smiski for each series.

## Technologies Used
- Node.js
- Express.js
- MongoDB (using MongoDB Atlas cloud database)
- Fetch API (for front-end API calls)
- HTML5, CSS3, JavaScript (for the front-end)

## Installation Instructions

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/smiski-collection-tracker.git
    cd smiski-collection-tracker
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root of the project.
    - Add your MongoDB connection string:
    ```env
    MONGO_URI=your-mongodb-connection-string
    ```

4. Run the server:
    ```bash
    npm start
    ```

5. Open the app in your browser:
    - Go to `http://localhost:3000` to see the homepage.

## API Endpoints

### GET /api/data
Fetches all Smiski data (all series and completion status).

### GET /api/:series
Fetches the Smiski data for a specific series.

### GET /api/collectionCompletion/:series
Fetches the collection completion percentage for a specific series.

### PATCH /api/toggleInCollection/:name
Toggles whether a specific Smiski is in your collection.

### POST /api/storeChoice
Stores the user's preferred store for a specific series.

### GET /api/mostCommonStore/:series
Fetches the most common store for a specific series.

## Usage

- When you open the homepage, the application will display a list of Smiski series.
- Each series will show its collection progress in the form of a progress bar.
- Click on a series to be redirected to a detailed page with an overview of all the Smiskis in that series.
- Toggle whether a Smiski is in your collection by clicking on the checkbox.

## Sources 

- https://chatgpt.com/share/66f2acb5-45b0-8012-afe1-c3e4dc03017d
- https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/connect/#std-label-node-connect-to-mongodb
- https://mongodb.github.io/node-mongodb-native/6.3/
- https://www.w3schools.com/w3css/w3css_progressbar.asp](https://www.w3schools.com/tags/tag_progress.asp)
- https://www.scaler.com/topics/progress-bar-in-html/
- https://tech.timonwa.com/blog/styling-progress-bar
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- https://moderncss.dev/pure-css-custom-checkbox-style/



