#  Repository Structure

This file  contains documentation for a parkour-styled game developed in Unity. Below you'll find the project structure, naming conventions, and guidelines to maintain consistency throughout the development process.

---

## Repository Structure

```
├── README.md          # Project overview and guidelines (this file)
├── LICENSE            # Licensing information (MIT)
├── UnityProject/      # The Unity project containing all game assets and scripts
│   ├── Assets/        # Game assets, scripts, prefabs, scenes, etc.
│   ├── ProjectSettings/  # Unity-specific project settings
│   └── Packages/      # Unity Package Manager dependencies
├── Docs/              # Documentation for the project
│   ├── conventions.md    # Documentation for conventions
│   ├── progress.md # Documentation for progress
│   └── research.md     # Documentation for research
└── .gitignore         # Git ignore file
```

---

## Naming Conventions

To maintain readability and consistency in the codebase and assets, adhere to the following naming conventions:

### Code Naming Conventions

#### Variables and Methods
- **CamelCase**: Use camelCase for variable names and method names.
  
  **Examples:**
  ```csharp
  int playerScore;
  void calculateJumpHeight() { ... }
  ```

#### Classes and Structs
- **PascalCase**: Use PascalCase for class and struct names.

  **Examples:**
  ```csharp
  public class PlayerController { ... }
  public struct JumpData { ... }
  ```

#### Constants
- **UPPER_SNAKE_CASE**: Use upper snake case for constants.

  **Examples:**
  ```csharp
  public const float MAX_SPEED = 10.0f;
  ```

#### Interfaces
- Prefix interface names with `I` followed by PascalCase.

  **Examples:**
  ```csharp
  public interface IJumpable { ... }
  ```

### Asset Naming Conventions

#### General Guidelines
- **Use descriptive names**: Make sure asset names clearly describe their purpose or content.
- **Avoid special characters**: Use underscores (_) to separate words if necessary.

#### Specific Asset Types
- **Prefabs:** Use PascalCase and suffix with `Prefab`.
  
  **Example:**
  ```
  PlayerCharacterPrefab
  ```

- **Scenes:** Use PascalCase and prefix with the scene’s purpose.

  **Example:**
  ```
  MainMenuScene
  Level1Scene
  ```

- **Scripts:** Use PascalCase and suffix with their role.

  **Example:**
  ```
  GameManager.cs
  PlayerMovement.cs
  ```

- **Textures:** Use descriptive camelCase with suffixes like `_albedo`, `_normal`, etc.

  **Example:**
  ```
  brickWall_albedo.png
  brickWall_normal.png
  ```

---