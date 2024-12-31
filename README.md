# JogJournal

JogJournal is a web application for tracking and managing your running activities. It allows users to log their runs, view their activity history, and filter activities based on various criteria such as distance, location, and time period.

## Features

- Create and manage running activities
- Upload and view activity images
- Filter activities by:
  - Activity type
  - Location
  - Distance range
  - Time period
- Responsive grid layout for activity display
- Image zoom functionality
- Detailed activity statistics

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (version 14.0 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Git](https://git-scm.com/) for version control

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
cd jogjournal
```

2. Install the required dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your MongoDB credentials:
```env
MONGODB_PASSWORD=your_mongodb_password
```

## Project Structure

```
assignment-2-KobeBerckmans/
├── src/
│   ├── assets/
│   │   └── images/
│       └── fonts/
│      
│   ├── css/
│       └── styles.css
│   
├── js/
│   └── app.js
├── package.json
└── README.md
└── progress.md
```

## Dependencies

The project uses the following npm packages:
- `express` - Web application framework
- `mongodb` - MongoDB driver for Node.js
- `dotenv` - Environment variables management
- `nodemon` (dev dependency) - Auto-reload server during development

## Running the Application

### Development Mode

1. Start the server with nodemon (auto-reloads on changes):
```bash
npm run dev
```

### Production Mode

1. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/strava` - Retrieve all activities
- `POST /api/strava` - Create a new activity
- `PUT /api/strava` - Update an existing activity
- `DELETE /api/strava` - Delete an activity

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```env
MONGODB_PASSWORD=your_mongodb_password
```

## Database Configuration

The application uses MongoDB Atlas as its database. To configure:

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP address to the IP whitelist
4. Create a database user
5. Update the `.env` file with your database password

## Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/my-new-feature
```
3. Commit your changes
```bash
git commit -m "Add some feature"
```
4. Push to the branch
```bash
git push origin feature/my-new-feature
```
5. Create a Pull Request

## Images

To add images, implement them first in de images folder. Then select them in youre file manager. If you save youre new activity the new image is implemented

## Running Tests

Currently, this project does not include automated tests. This would be a great area for contribution!

## Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**
   - Check your internet connection
   - Verify MongoDB Atlas credentials
   - Ensure your IP is whitelisted in MongoDB Atlas

2. **Image Upload Issues**
   - Verify the image path in src/assets/images exists
   - Check file permissions

## Sources & Learning Materials

### Official Documentation
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### JavaScript Conventions & Best Practices
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [JavaScript Clean Code Best Practices](https://github.com/ryanmcdermott/clean-code-javascript)

### Tutorial Videos
- [Node.js Crash Course](https://www.youtube.com/watch?v=fBNz5xF-Kx4) - Traversy Media
- [MongoDB Tutorial](https://www.youtube.com/watch?v=pWbMrx5rVBE) - Traversy Media


### Helpful Blogs & Articles
- [Understanding Express.js Middleware](https://medium.com/@jamischarles/what-is-middleware-a-simple-explanation-bb22d6b41d01)
- [MongoDB Best Practices](https://www.mongodb.com/blog/post/performance-best-practices-mongodb)


### Tools & Resources Used
- [Visual Studio Code](https://code.visualstudio.com/) - Code editor
- [MongoDB Compass](https://www.mongodb.com/products/compass) - MongoDB GUI


### Design Resources
- [CSS-Tricks](https://css-tricks.com/) - CSS tutorials and tricks


### Useful npm Packages
- [nodemon](https://www.npmjs.com/package/nodemon) - Auto-reload development
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [express](https://www.npmjs.com/package/express) - Web framework
- [mongodb](https://www.npmjs.com/package/mongodb) - MongoDB driver


### Communities & Forums
- [Stack Overflow](https://stackoverflow.com/)
- [Reddit r/javascript](https://www.reddit.com/r/javascript/)
- [Reddit r/webdev](https://www.reddit.com/r/webdev/)
- [DEV Community](https://dev.to/)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Attribution

- Express.js - [MIT License](https://github.com/expressjs/express/blob/master/LICENSE)
- MongoDB Node.js Driver - [Apache 2.0 License](https://github.com/mongodb/node-mongodb-native/blob/master/LICENSE.md)
- Nodemon - [MIT License](https://github.com/remy/nodemon/blob/master/LICENSE)


## Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, caste, color, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior:

* The use of sexualized language or imagery, and sexual attention or advances of any kind
* Trolling, insulting or derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information without explicit permission
* Other conduct which could reasonably be considered inappropriate in a professional setting

### Enforcement Responsibilities

Project maintainers are responsible for clarifying and enforcing our standards of acceptable behavior and will take appropriate and fair corrective action in response to any behavior that they deem inappropriate, threatening, offensive, or harmful.

### Scope

This Code of Conduct applies within all community spaces, and also applies when an individual is officially representing the community in public spaces.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers responsible for enforcement at [INSERT CONTACT METHOD]. All complaints will be reviewed and investigated promptly and fairly.

### Enforcement Guidelines

Project maintainers will follow these Community Impact Guidelines in determining the consequences for any action they deem in violation of this Code of Conduct:

1. **Correction**
   - Community Impact: Use of inappropriate language or other behavior deemed unprofessional.
   - Consequence: A private, written warning from moderators, providing clarity around the nature of the violation.

2. **Warning**
   - Community Impact: A violation through a single incident or series of actions.
   - Consequence: A warning with consequences for continued behavior.

3. **Temporary Ban**
   - Community Impact: A serious violation of community standards.
   - Consequence: A temporary ban from any sort of interaction or public communication with the community.

4. **Permanent Ban**
   - Community Impact: Demonstrating a pattern of violation of community standards.
   - Consequence: A permanent ban from any sort of public interaction within the community.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 2.1,
available at [https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html

For answers to common questions about this code of conduct, see the FAQ at
[https://www.contributor-covenant.org/faq][FAQ]. Translations are available at
[https://www.contributor-covenant.org/translations][translations].

[FAQ]: https://www.contributor-covenant.org/faq
[translations]: https://www.contributor-covenant.org/translations



## Authors

- Kobe Berckmans

## Acknowledgments

- MongoDB Atlas for database hosting
- Express.js community for the excellent web framework
- Node.js community for the runtime environment



