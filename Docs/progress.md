# Progress Report: Parkour Game

This document provides a detailed overview of the project's progress, structure, features, and coding practices. It is meant to serve as a guide for contributors, maintainers, and anyone interested in understanding the development process.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Way of Working](#way-of-working)  
3. [Naming Conventions](#naming-conventions)  
4. [Implemented Features](#implemented-features)  
5. [Code Quality](#code-quality)  
6. [Documentation](#documentation)  

---

## Project Overview

The **Parkour Game** project focuses on creating an engaging parkour-style game where player performance is tracked and visualized using Firebase Realtime Database. The key goals include:
- Recording player data such as level completion times.
- Providing a leaderboard to compare performance among players.
- Ensuring high-quality code and thorough documentation to make the project extensible and maintainable.

---

## Way of Working

### **Development Workflow**
- **Version Control**: The project uses **Git** for version control, with a branching model:
  - `main`: Stable, production-ready branch.
  - `feature/*`: Branches for individual features or fixes.
  - `hotfix/*`: For urgent bug fixes.
- **Commits**: Commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) specification to ensure clarity and consistency.
  - Example: `feat: add leaderboard display logic` or `fix: resolve timer null reference exception`.

### **Collaboration Tools**
- **Task Management**: Tasks are tracked using GitHub Issues and Projects.
- **Code Reviews**: Pull requests are reviewed by at least one other team member before merging.

### **Testing**
- **Playtesting**: Conducted regularly to ensure features work as expected.
- **Debugging**: Errors are logged to the console for quick identification and resolution.

---
## Naming Conventions

### **Scripts**
- Use PascalCase for script names:
  - Example: `ParkourTimer.cs`, `FirebaseController.cs`

### **GameObjects**
- Use a clear, descriptive name for each GameObject:
  - Example: `Player`, `StartBlock`, `LeaderboardPanel`

### **Variables and Methods**
- **Private Variables**: `_camelCase`
  - Example: `_playerScore`
- **Public Variables and Methods**: PascalCase
  - Example: `StartTimer()`, `PlayerName`

### **Folders**
- Organize folders by functionality (e.g., `Scenes`, `Scripts`, `Prefabs`).

---

## Implemented Features

### **Core Gameplay**
- **Parkour Timer**: Tracks and displays elapsed time for each player attempt.
- **Start and Finish Blocks**: Triggers for starting and stopping the timer.

### **Data Storage**
- **Firebase Integration**: Stores player completion times in a Realtime Database.
- **Player Identification**: Tracks individual players by unique IDs.

### **UI Features**
- **Leaderboard**: Displays the top 10 times from Firebase in real-time.
- **Dynamic Leaderboard Entries**: Updates player names and times dynamically using TextMeshPro.

---

## Code Quality

### **Best Practices**
- **Separation of Concerns**: Scripts are modular, each responsible for a single aspect of the game (e.g., `FirebaseController` handles database interactions).
- **Error Handling**: Null checks and error logs are implemented to prevent runtime issues.
- **Reusable Code**: Prefabs and helper methods minimize redundancy.

### **Code Review Checklist**
1. Is the code readable and easy to understand?
2. Does it follow the naming conventions?
3. Are there any hard-coded values that could be replaced with constants or configurations?
4. Are all public variables necessary, or could they be private?

---

## Documentation

### **User Guide**
- Detailed instructions for setting up and running the project are provided in the `README.md`.

### **Developer Guide**
- This `PROGRESS.md` serves as a comprehensive reference for contributors.
