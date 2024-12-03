# Photographers-Association-Membership-Application

An all-in-one platform connecting photographers to a vibrant community, professional opportunities, and exclusive resources. This membership application is designed for photographers of all levels to showcase their work, expand their skills, and connect with potential clients and collaborators.

## Root Level

/membership-app
│
├── /server
│ ├── /controllers
│ ├── /models
│ ├── /routes
│ ├── /middlewares
│ ├── /config
│ ├── /utils
│ ├── /services
│ ├── /tests
│ ├── app.js
│ ├── server.js
│ └── .env
│
├── /client
│ ├── /public
│ ├── /src
│ │ ├── /assets
│ │ ├── /components
│ │ ├── /pages
│ │ ├── /services
│ │ ├── /contexts
│ │ ├── /utils
│ │ ├── App.js
│ │ ├── index.js
│ │ └── styles.css
│ ├── .env
│ └── package.json
│
├── /node_modules
├── package.json
└── README.md

## Detailed Breakdown

### Server

- controllers/: Logic for handling requests and sending responses.

- models/: Mongoose schemas and models.

- routes/: Define routes and map them to controllers.

- middlewares/: Custom middleware functions.

- config/: Configuration files (e.g., database connection).

- utils/: Utility functions and helpers.

- services/: Business logic and external services interactions.

- tests/: Test files for the backend.

- app.js: Application setup (e.g., middleware, routes).

- index.js: Server setup (e.g., listening on a port).

### Client

- public/: Static files (e.g., index.html).

- src/: Source files.

- assets/: Images, icons, and other static assets.

- components/: Reusable React components.

- pages/: Page components.

- services/: API calls and other services.

- contexts/: Context API providers and consumers.

- utils/: Utility functions and helpers.

- App.js: Main application component.

- index.js: Entry point for the React app.

### Other Files

- node_modules/: Dependencies installed via npm.

- package.json: Configuration for npm scripts and dependencies.

- README.md: Project documentation.

### routes

- ### Auth

      -   /api/v1/user/login:
      -   /api/v1/user/signup:
      -   /api/v1/secure/add:
            - Secure user can be added to database as moderator
            - The add route should be protect for only admin user

      -   /api/v1/secure/login:
            - Secure user sould be able to login using email and password.
            - Secure user login access token and refresh token should stored on session

            - Only loggedin moderator or admin user role can access secure dashboard
      -   /api/v1/user/forgot-password
      -   /api/v1/user/reset-password
      -   /api/v1/secure/forgot-password
      -   /api/v1/secure/reset-password

<!-- https://www.linkedin.com/pulse/software-testing-101-beginners-guide-types-techniques-wgphc/ -->

```js

{
  "image": "https://placehold.co/400",
  "firstname": "john",
  "lastname": "doe",
  "email": "john@gmail.com",
  "password": "1234567890",
  "Dob": "2010-10-20",
  "phone": "08080808089",
  "location": "Lagos",
  "address": "Ikeja mall",
  "aboutuser": "Tall and lanky",
  "social": [
    {"facebook": "https://www.facebook.com"},
    {"linkedIn": "https://linkedin.com"}
  ],
  "interest": ["landscape", "event"]
}

```
