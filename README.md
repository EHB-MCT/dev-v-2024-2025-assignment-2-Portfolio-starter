
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


## License
This project is licensed under the MIT License. You are free to use, modify, and distribute this project in accordance with the terms of the license.
[MIT](https://choosealicense.com/licenses/mit/)



## Authors

- [@KobeBerckmans](https://www.github.com/KobeBerckmans)
