# **Progress.md**

### **Overview**

This document explains the steps taken to complete the project, from locating the data source to implementing an online database and developing the frontend and backend functionalities. It also explains the reasoning behind decisions made during development.

---

### **Initial Setup**

#### 1. **Locate Data Source**

The first challenge was locating the data. I found it stored locally on my PC in a SQLite database file. This became the starting point for the project.

#### 2. **Set Up Development Environment**

Installed and configured the necessary tools, such as:

- **Node.js and npm**: For backend and package management.
- **MongoDB**: To serve as the online database.
- **Postman**: For testing API endpoints. <br>
  Initialized both frontend (React + Vite) and backend (Node.js + Express) environments.

---

### **Local Database Integration**

1. **SQLite Integration** <br>

   - I used `better-sqlite3` because it was straightforward to set up and worked well for reading data from the local SQLite database.
   - Starting with SQLite allowed me to validate the data structure and ensure the API could fetch data correctly before moving to a scalable online solution.

2. **Postman Testing** <br>
   I created a `/GET` endpoint to fetch data from SQLite and used Postman to test that the API returned the expected data.

3. **Why SQLite First?** <br>
   SQLite was chosen because the data was stored in this format locally, and it was easier to validate and work with the existing data without setting up a database connection initially.

---

### **Transition to MongoDB**

1. **Online Database Setup** <br>
   I migrated the data to MongoDB because it supports remote access, scalability, and integration with modern web applications. MongoDB also allows for more flexibility compared to other databases, which is useful when working with dynamic data like this.

2. **Batch Migration** <br>
   The data migration script was optimized to handle batches of data to avoid performance bottlenecks and ensure the entire dataset could be migrated without timeouts. This was essential as the SQLite database contained a large amount of data.

3. **Why MongoDB?** <br>
   MongoDB was chosen because of its flexibility, easy to use, and my prior experience with it in other school projects. It is also well-suited for handling JSON-like documents, making it perfect for this project.

---

### **Backend Development**

1. **API Routes** <br>
   Created API routes to retrieve (`GET /encounters`) and add (`POST /encounters`) data. These routes ensured a good communication between the frontend and the backend.

2. **Adding Encounter Types** <br>
   Implemented logic to categorize encounters as `boss`, `character`, or `ally`. This addition allowed for better filtering and visualization on the frontend side.

3. **Why Add Encounter Types?** <br>
   Differentiating between types was necessary to replicate the functionality of the original app, where bosses were displayed separately and characters and allies had their roles in encounters.

4. **Refractoring** <br>
   Removed unused SQLite dependencies and cleaned up the code to improve maintainability.

---

### **Frontend Development**

1. **Data Visualization** <br>
   Developed a React-based frontend to display encounter data in a table. This table included details like gear score, name, class, DPS and DPS percentage.

2. **Class Colors** <br>

- Integrated class-specific colors to enhance visual clarity.
- Example, `Berserker` is red, and `Paladin` is orange.

3. **Grouping and Sorting** <br>

- Grouped data by encounter ID, displaying the boss name at the top of each group. This approach made it easier to distinguish between encounters.<br>
- Sorted characters and allies within each encounter by DPS in descending order, highlighting top performers.

4. **Dark Mode** <br>
   Developed a dark mode feature for better usability and aesthetics, particularly for users viewing the data for extended periods. I'm not the biggest fan of the white flashbangs.

5. **Filtering and Search Functionality** <br>

- Added a search bar to filter data by character name, boss, or ally.
- Made a class filter dropdown to filter encounters by specific classes.
- Included a reset filters button to clear both search and filter selections.

6. **Responsive Layout** <br>

- Designed the UI to display encounters in rows of 3 or 4 cards, depending on screen size.
- Ensured encounters were displayed under the search and filter section for consistency.

---

### Final Adjustments

1. **Refinements**

- Fixed minor CSS inconsistencies to ensure proper alignment and spacing of table columns and encounter groups.
- Adjusted the layout to dynamically size the encounter group cards to fit content.

2. **Documentation**

- Updated the README with:
  - Detailed setup instructions.
  - API endpoint documentation.
  - Examples for GET and POST requests.
- Documented project structure and key decisions in this progress file.

3. **Testing**

- Manually tested all functionalities, including:
  - API routes.
  - Search and filter combinations.
  - Responsiveness

4. **Code Cleanup**

- Removed unused folders (config, services, etc.) to simplify the project structure.
- Finalized comments and removed console.logs.
