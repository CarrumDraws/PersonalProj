const app = require("./app.js");
const db = require("./config/connection.js");
const PORT = process.env.PORT || 3000;

// 1. Spotify Lite (Express.js, EJS, SCSS, MongoDB) - Security
// Continue implementing your mini-Spotify application. So far, the features should include:
// - Users can view all the songs that they’ve liked.
// - Users can search for songs based on the artist name or song title.
// - Users can filter song search results based on their language and genre.
// - Users can like a song.
// - Users can follow an artist.
// - Users can view & edit their own profile (username, email, password).
// Now, you need to implement user auth and the remaining part of the frontend.

// Step 1: Implement the backend for registration, login, and logout features.
// - Users can sign up (username, unique email, hashed password).
// - Users can sign in (use JWT to manage auth).
// - Users can log out.
// - Users should not be able to visit pages or send requests to certain endpoints without a valid JWT.

// POST /user/signup : user signs up with username, email, and password
// POST /user/login : user logs in with email and password
// POST /user/logout : user logs out

// Step 2: Test the API with Postman
// Include screenshots of the server responses when using Postman.

// Step 3: Use plain HTML, JS or EJS to create the rest of the frontend for this mini- Spotify application. SCSS is recommended for styling if you have time to do it.
// - Ignore styling for now. Focus on the basic frontend functionality needed to interact with the backend. For example:
// - Input fields and buttons for login/signup/logout/editing profile.

// Step 4: Add basic input validation on the frontend and backend.
// - Choose either AJV, Joi, or Yup.

// If you have time, recreate the Spotify website based on the theme, layout, …

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
  });
});
