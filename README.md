
# Historical Events Web Application

Historical Events is a web application that allows users to search for historical events based on a search term, year, month, and day. The application retrieves data from an external API and displays the results in an aesthetically pleasing list format.



## Tech Stack & Explanation

**Client:** HTML, CSS, JS

**Server:** Node, Axios


You can import Axios directly into your project by including the import statement:


**import axios from 'axios';**

Alternatively, you can use Axios by including the CDN script in your HTML file:

**<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>**




## Resources
- [Video Tutorial: Javascript Convetions](https://www.youtube.com/watch?v=j-nNgSYTkX8&t=655s)
- [Ninja API documentation: Historical events documentation](https://api-ninjas.com/api/historicalevents)
- [Chat GPT: For adding documentation ](https://chatgpt.com/)
- [Video Tutorial: Javascript Naming Convetions ](https://www.youtube.com/watch?v=WFykob5BN6c)


## API Reference

#### Historical Events via Api-Ninjas
https://api.api-ninjas.com/v1/historicalevents

```http
Historical Events
GET /api/v1/historicalevents
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `tekst` | `string` | **Required**. Search term to filter historical events.|
| `year` | `number` | **Optional**. Filter by year |
| `month` | `number` | **Optional**. Filter by month |
| `day` | `number` | **Optional**. Filter by day |
| `api_key` | `string` | **Required**. Your API Key|

To use the application, users need to create an account on API Ninja to obtain an API key, which is required for accessing the data. The results are displayed in an aesthetically pleasing list format.
## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    ## Installation

1. **Clone the repository:**

    ```sh
    git clone git@github.com:username/repository.git
    cd repository
    ```


2. **Install JavaScript dependencies:**

    ```sh
    npm install
    npm run dev
    ```

    
## Features

- User friendly design
- List of historical events
- Search by name, keyword, year, day, month


## MIT License

Copyright (c) [Year] [Your Name or Organization]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Code of Conduct

### Our Pledge

We, as members, contributors, and leaders, pledge to make participation in our project and community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

We commit to acting in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.

### Our Standards

Examples of behavior that contributes to a positive environment include:

- Demonstrating empathy and kindness toward other people.
- Being respectful of differing opinions, viewpoints, and experiences.
- Giving and gracefully accepting constructive feedback.
- Focusing on what is best for the community.
- Showing consideration for other members and the project goals.

Examples of unacceptable behavior include:

- The use of sexualized language or imagery and unwelcome sexual attention or advances.
- Trolling, insulting or derogatory comments, and personal or political attacks.
- Public or private harassment.
- Publishing others’ private information, such as a physical or email address, without their explicit permission.
- Other conduct which could reasonably be considered inappropriate in a professional setting.

### Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned with this Code of Conduct. They may also temporarily or permanently ban any contributor for behaviors that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies within all project spaces and in public spaces when an individual is representing the project or its community. Examples include using an official project email address, posting via an official social media account, or acting as an appointed representative at an online or offline event.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at **[your-email@example.com]**. All complaints will be reviewed and investigated promptly and fairly.

The project team is obligated to respect the privacy and security of the reporter of any incident.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant](https://www.contributor-covenant.org), version 2.1.


## Authors

- [@KobeBerckmans](https://www.github.com/KobeBerckmans)
