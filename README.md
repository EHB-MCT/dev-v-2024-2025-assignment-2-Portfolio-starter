# Social Media Usage Tracker

## Overview

This project tracks and aggregates social media usage over time, focusing on daily usage data for applications such as Instagram, WhatsApp, Tiktok, Snapchat, and Twitter. The data was collected and processed in JSON format, and then visualized through a web application built using Vue.js.

## Purpose

The goal of this project was to measure my social media engagement and usage patterns across several days. This data will help identify which apps are used most frequently and how social media usage evolves over time.

## Technologies Used

- **Vue.js**: Used to create the user interface and interact with the data.
- **JavaScript**: For data processing and logic implementation.
- **Node.js (optional)**: For setting up a backend if required.
- **JSON**: To store the social media usage data.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project folder:

   ```bash
   cd <project_folder>
   ```

3. Install dependencies (if needed):

   ```bash
   npm install
   ```

4. Run the project:

   ```bash
   npm run serve
   ```

5. Open the app in your browser at `http://localhost:8080`.

## Data

The app uses data collected from my personal social media usage. The data is stored in `data/processedData.json`. Here is an example of the structure:

```json
{
	"datum": "woensdag 25-12",
	"apps": [
		{
			"naam": "Instagram",
			"tijdInMinuten": 380
		},
		{
			"naam": "Whatsapp",
			"tijdInMinuten": 235
		}
	]
}
```
