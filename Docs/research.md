# Research: Folder Structure and Naming Conventions

This document explores best practices for organizing folder structures in Unity projects and GitHub repositories. Proper structure and naming conventions enhance project maintainability, readability, and collaboration.

---

## Table of Contents

1. [Unity Folder Structure](#unity-folder-structure)
   - [Best Practices](#unity-best-practices)
   - [Examples](#unity-folder-structure-examples)
   - [Sources](#unity-folder-structure-sources)
2. [GitHub Folder Structure](#github-folder-structure)
   - [Best Practices](#github-best-practices)
   - [Examples](#github-folder-structure-examples)
   - [Sources](#github-folder-structure-sources)

---

## Unity Folder Structure

### Best Practices
Unity projects can quickly become unmanageable without proper folder organization. The following principles should guide folder structuring:
- **Separation of Concerns**: Organize by functionality (e.g., scripts, prefabs, materials).
- **Minimize Clutter**: Keep the `Assets/` folder clean and use subfolders extensively.
- **Naming Consistency**: Use clear, descriptive, and consistent names for folders and files.
- **Avoid Deep Nesting**: Limit folder nesting to maintain accessibility.

### Recommended Unity Folder Structure
A well-organized Unity project may look like this:

Assets/
├── Scenes/                  # Contains all scene files (.unity)
│   ├── MainMenu.unity
│   ├── Level1.unity
├── Scripts/                 # All gameplay logic and utilities
│   ├── Core/                # Core game mechanics (Timer, Player movement)
│   ├── UI/                  # Scripts for UI elements (e.g., Leaderboard)
├── Prefabs/                 # Reusable GameObjects
│   ├── Blocks/              # Start and Finish blocks
│   ├── UI/                  # Leaderboard entries
├── Materials/               # Material files for shaders
├── Textures/                # Texture and sprite assets
├── Audio/                   # Audio files and sound effects
└── Resources/               # Unity Resources folder for dynamically loaded assets


### Naming Conventions in Unity
- **Folders**: Use PascalCase to maintain consistency (e.g., `Scenes`, `Scripts`).
- **Files**: 
  - Scripts: PascalCase (e.g., `PlayerController.cs`).
  - Prefabs: Describe their purpose (e.g., `StartBlock.prefab`, `LeaderboardEntry.prefab`).
- **Variables**:
  - Private: `_camelCase` (e.g., `_playerSpeed`).
  - Public: PascalCase (e.g., `PlayerName`).

### Unity Folder Structure Examples
**Example 1: Small Project**

Assets/
├── Scenes/
│   ├── Game.unity
├── Scripts/
│   ├── GameController.cs
│   ├── Player.cs
├── Prefabs/
│   ├── Player.prefab
└── Materials/


**Example 2: Larger Project**

Assets/
├── Scenes/
├── Scripts/
│   ├── Core/
│   ├── Utilities/
├── Prefabs/
│   ├── Characters/
│   ├── Environments/
├── Materials/
├── Textures/
├── Audio/
└── Resources/


### Sources
1. [Unity Official Documentation on Folder Structure](https://docs.unity3d.com/Manual/BestPracticeUnderstandingPerformanceInUnity2.html)
2. [Unity Folder Organization by Brackeys](https://www.youtube.com/watch?v=V8gwsgst3rs)
3. [Unity Best Practices: Folder Structure](https://gamedevacademy.org/unity-best-practices/)

---

## GitHub Folder Structure

### Best Practices
For GitHub repositories, the folder structure should ensure clarity, maintainability, and ease of collaboration:
- **Purpose-Driven Organization**: Structure the repository to reflect its purpose (e.g., documentation, source code, assets).
- **Top-Level Readability**: Important files (e.g., `README.md`) should be at the root for quick access.
- **Modular Design**: Separate functionality into independent folders or modules where possible.

### Recommended GitHub Folder Structure
Here’s an example folder structure for a Unity project hosted on GitHub:

Repository/
├── Assets/                # Unity project files
│   ├── Scenes/
│   ├── Scripts/
│   ├── Prefabs/
│   ├── Materials/
├── Docs/                  # Documentation (e.g., setup guides, progress reports)
│   ├── README.md
│   ├── PROGRESS.md
├── LICENSE                # Project license
├── .gitignore             # Git ignore file
└── README.md              # Main project documentation


### Naming Conventions in GitHub
- **Folders**: Use clear, descriptive names (e.g., `Docs`, `Tests`, `Assets`).
- **Files**: 
  - Documentation: Use uppercase (e.g., `README.md`, `LICENSE`).
  - Scripts: Follow Unity naming conventions if applicable.

### GitHub Folder Structure Examples
**Example 1: Simple Repository**

Repository/
├── Assets/
│   ├── Scripts/
│   ├── Prefabs/
├── README.md
├── LICENSE
└── .gitignore

**Example 2: Complex Repository with Documentation**

Repository/
├── Assets/
├── Docs/  
│   ├── GettingStarted.md
│   ├── CONTRIBUTING.md
├── Tests/
├── .github/
│   ├── workflows/
├── README.md
├── LICENSE
└── .gitignore


### Sources
1. [GitHub Folder Structure Best Practices](https://docs.github.com/en/get-started/quickstart)
2. [Organizing GitHub Repositories by Atlassian](https://www.atlassian.com/git/tutorials/git-best-practices)
3. [Best Practices for GitHub Repos](https://towardsdatascience.com/github-repository-structure-best-practices-248e6effc405)

---

## Summary of Best Practices
1. **Consistency**: Follow a consistent naming and organization pattern throughout.
2. **Clarity**: Make folder and file purposes obvious to collaborators.
3. **Documentation**: Include a `README.md` at the root and a `Docs/` folder for additional documentation.
4. **Modularity**: Separate unrelated or independent parts of the project into different folders/modules.

By adhering to these practices, you can ensure that both Unity projects and GitHub repositories are clean, scalable, and easy to maintain.

