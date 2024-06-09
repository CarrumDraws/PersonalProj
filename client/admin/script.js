// Load the navbar
(async function getNavbar() {
  try {
    const response = await fetch("../navbar/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    navbarPlaceholder.innerHTML = data;

    // Load the CSS for the navbar panel
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "../navbar/styles.css";
    document.head.appendChild(css);

    // Once navbar is loaded, load navbar script
    const script = document.createElement("script");
    script.src = "../navbar/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load the navbar:", err);
  }
})();

// Load the Favorites Panel
(async function getFavoritesPanel() {
  try {
    const response = await fetch("favorites/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const navbarPlaceholder = document.getElementById("favorites-placeholder");
    navbarPlaceholder.innerHTML = data;

    // Load the CSS for the favorites panel
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "favorites/styles.css";
    document.head.appendChild(css);

    // Load the Bootstrap for the favorites panel
    const bs = document.createElement("link");
    bs.rel = "stylesheet";
    bs.href =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    document.head.appendChild(bs);

    // Once favorites is loaded, load favorites script
    const script = document.createElement("script");
    script.src = "favorites/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load favorites:", err);
  }
})();

// getUserData
(async function getUserData() {
  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`http://localhost:3000/user`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const users = await response.json();
    console.log("Success:", users);
    displayData(users);
  } catch (error) {
    console.error("Error:", error);
  }
})();

function displayData(users) {
  let usersSection = document.getElementById("user-placeholder");
  // users is an array of brand, favorites, description, favorited, image, name, price, rating, _id.

  for (let i = 0; i < users.length; i++) {
    usersSection.append(createTile(users[i]));
  }
}

// user is
// admin: false,
// favorites: "mochadog@gmail.com",
// favorites: [
//   "66661449a8ee415df6c290b3",
//   "66661449a8ee415df6c290b4"
// ],
// password: "$2a$10$shmhSQWuj2lGaaef/vYC.eynye7rT27SwfEa8vYhW7UCFEvARbR2S",
// username: "Mocha",
// __v: 6,
// _id: "6666159a54fb1008b861d8fa"
function createTile(user) {
  const tile = document.createElement("div");
  tile.style.display = "flex";
  tile.style.flexDirection = "column";

  // Set user id in query param + reload page
  tile.addEventListener("click", (e) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("id");
    currentUrl.searchParams.set("id", user._id);
    window.location.href = currentUrl.toString();
  });

  const username = document.createElement("h1");
  username.innerHTML = user.username;
  tile.appendChild(username);

  const email = document.createElement("div");
  email.innerHTML = user.email;
  tile.appendChild(email);

  const favorites = document.createElement("div");
  favorites.innerHTML =
    user.favorites.length +
    " Favorite" +
    (user.favorites.length === 1 ? "" : "s");
  tile.appendChild(favorites);

  return tile;
}
