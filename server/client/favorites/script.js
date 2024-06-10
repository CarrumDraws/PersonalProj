import { toggleFavorite } from "./utils/toggleFavorite.js";

// getFavorites
(async function getFavorites() {
  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`http://localhost:3000/api/user/favorite`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();
    displayFavorites(products);
  } catch (error) {
    console.error("Error:", error);
  }
})();

function displayFavorites(products) {
  let favoritesPanel = document.getElementById("favoritesPanel");
  // products is an array of brand, category, description, favorited, image, name, price, rating, _id.

  for (let i = 0; i < products.length; i++) {
    favoritesPanel.append(createFavoritesTile(products[i]));
  }
}

function createFavoritesTile(product) {
  const tile = document.createElement("div");
  tile.classList.add("favoritesTile");

  const img = document.createElement("div");
  img.classList.add("favorites-image-container");
  img.style.backgroundImage = `url(${product.image})`;
  tile.appendChild(img);

  const info = document.createElement("div");
  info.style.padding = "0.25rem";
  info.style.display = "flex";
  info.style.flexDirection = "column";
  info.style.alignItems = "left";
  info.style.textAlign = "left";

  info.style.whiteSpace = "nowrap";
  info.style.overflow = "hidden";
  info.style.textOverflow = "ellipsis";

  const name = document.createElement("b");
  name.textContent = product.name;
  name.style.margin = "0";
  info.appendChild(name);

  const price = document.createElement("div");
  price.textContent = `$${product.price.toFixed(2)}`;
  info.appendChild(price);

  const remove = document.createElement("a");
  remove.textContent = "Remove";
  remove.href = "#";
  remove.style.fontSize = "12px";
  info.appendChild(remove);

  remove.addEventListener("click", () => {
    toggleFavorite(product._id);
  });

  tile.appendChild(info);

  return tile;
}
