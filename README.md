# Parkour Game: Data Visualisation & Aggregation

This repository contains the code, data, and resources to analyze and visualize player interactions in a Unity game.

The focus of this repository is to develop a comprehensive system for collecting, aggregating, and visualizing player data from a parkour-style game. By analyzing player behavior, this system aims to enhance level design, improve gameplay mechanics, and provide actionable insights for developers and engaging feedback for players.

This repository demonstrates the potential of integrating data-driven methodologies into game development, delivering benefits to both creators and players by optimizing gameplay experiences and fostering a deeper understanding of player interactions.


## Table Of Contents
- [Features](#features)
- [Technologies](#technologies)
- [License](#License)
- [Sources](#sources)

---

## Features
- **Data Aggregation**: Collects and stores player interaction data (e.g., time to complete levels) in a Firebase Realtime Database, allowing for aggregation and analysis of gameplay performance.
- **Player Choice Insights**: Tracks and analyzes player behavior within levels, identifying choices that players make, such as paths chosen or areas where they spend the most time. This can be used to refine level design and gameplay balance.
- **Real-Time Visualisation**: Implements real-time visual feedback within the Unity game, including displaying leaderboards based on time records and providing dynamic data visualization for performance comparisons (can be done by pressing Tab when project is loaded in).


---

## Technologies
- **Unity**: Game engine used to create the parkour-style game.
- **Firebase**: A cloud database solution used to store player data (times, interactions) in real-time.
- **TextMeshPro**: Used for advanced UI text rendering to display leaderboard entries and other player data on-screen.

---

## Project Setup
Here's how to setup this project on your local device:

1. Clone this repository onto your local machine.
2. Make sure you have [Unity Hub](https://unity.com/download) installed, and open it.
3. Once Unity Hub is open, go to the projects tab, and click "Add".
4. Make sure to select "Add project from disc" and add the cloned repository from the first step.
5. Once the project has been opened, open the folder structure inside the editor.
6. Open the "Assets" folder, navigate to the "Scenes" folder and open ParkourGame.unity
7. Run the project by pressing the play button at the top of the editor.

---

## License
This project is licensed under the [MIT License](LICENSE.txt). See the LICENSE file for more details.

---

## Sources

- [Firebase Unity Setup](https://youtu.be/hAa5exkTsKI)

### Naming Conventions
- [Unity Naming Conventions](https://unity.com/how-to/naming-and-code-style-tips-c-scripting-unity) 
- [Unity Style Guide](https://github.com/justinwasilenko/Unity-Style-Guide)

### Materials
- [Grid Prototype Materials](https://assetstore.unity.com/packages/2d/textures-materials/gridbox-prototype-materials-129127)

### Code organisation
- [Unity Code Organisation](https://unity.com/how-to/organizing-your-project)