import { loadNavbar } from "/client/navbar/utils/loadNavbar.js";
import { loadFavorites } from "/client/admin/favorites/utils/loadFavorites.js";
import { adminRoute } from "/client/utils/adminRoute.js";
import { validPage } from "/client/utils/validPage.js";
document.addEventListener("DOMContentLoaded", () => {
  validPage();
  adminRoute();
  loadNavbar(); // Load the navbar
  loadFavorites(); // Load the Favorites Panel
});

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
    let usersSection = document.getElementById("user-placeholder");
    for (let i = 0; i < users.length; i++) {
      usersSection.append(createTile(users[i]));
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();

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
