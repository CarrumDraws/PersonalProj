import { loadNavbar } from "/navbar/utils/loadNavbar.js";
import { loadFavorites } from "/favorites/utils/loadFavorites.js";
import { nonAdminRoute } from "/utils/nonAdminRoute.js";

import { updateFavoritePanel } from "../favorites/script.js";
import { toggleFavorite } from "/favorites/utils/toggleFavorite.js";

document.addEventListener("DOMContentLoaded", () => {
  nonAdminRoute();
  loadNavbar();
  loadFavorites();
});

function loggedIn() {
  return !!(localStorage.getItem("token") && localStorage.getItem("user"));
}

// getProductData
(async function getProductData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    let productid = urlParams.get("productid");

    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/api/products/details/${productid}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const product = await response.json();
    console.log("Success:", product);
    displayProductData(product);
    getRelated(product.brand);
  } catch (error) {
    // Clear page
    const main = document.getElementById("mainContent");
    main.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.innerHTML = "400 Error: Item Not Found";
    main.append(h1);

    console.error("Error:", error);
  }
})();

function displayProductData(product) {
  const img = document.getElementById("productimg");
  img.src = product.image;
  img.alt = product.name;

  const name = document.getElementById("name");
  name.innerHTML = product.name;

  const rating = document.getElementById("rating");
  rating.innerHTML = `${product.rating} / 5 Stars`;

  const meta = document.getElementById("meta");
  meta.innerHTML = `${product.brand}  /  ` + product.category;

  const price = document.getElementById("price");
  price.innerHTML = `${product.price.toFixed(2)}`;

  const description = document.getElementById("description");
  description.style.marginBottom = "1rem";
  description.innerHTML = product.description;

  const favorite = document.getElementById("favorite");
  if (loggedIn()) {
    favorite.innerHTML = product.favorited
      ? "Remove from Favorites"
      : `Add to Favorites`;
    favorite.classList.add("btn");
    favorite.classList.add(product.favorited ? "btn-secondary" : "btn-primary");
    favorite.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(product);
    });
  } else favorite.remove();
}

async function getRelated(brand) {
  let morefromDiv = document.getElementById("morefrom");
  morefromDiv.innerHTML = `More From ${brand}`;

  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/api/products?brand=${brand}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();

    let related = document.getElementById("related");
    for (let i = 0; i < products.length; i++) {
      if (i > 2) break;
      related.append(relatedTile(products[i]));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function relatedTile(product) {
  const tile = document.createElement("div");
  tile.style.display = "flex";
  tile.style.flexDirection = "row";
  tile.style.alignItems = "center";
  tile.style.textAlign = "center";

  tile.addEventListener("click", () => {
    window.location.href = `/products/index.html?productid=${product._id}`;
  });

  const img = document.createElement("img");
  img.style.width = "30%";
  img.style.height = "auto";
  img.style.aspectRatio = "1 / 1";
  img.src = product.image;
  img.alt = product.name;
  tile.appendChild(img);

  const info = document.createElement("div");
  info.style.display = "flex";
  info.style.flexDirection = "column";
  info.style.alignItems = "left";
  info.style.textAlign = "left";

  const name = document.createElement("h6");
  name.textContent = product.name;
  name.style.margin = "0";
  info.appendChild(name);

  const rating = document.createElement("div");
  rating.textContent = `${product.rating} / 5 Stars`;
  info.appendChild(rating);

  const price = document.createElement("div");
  price.textContent = `$${product.price.toFixed(2)}`;
  info.appendChild(price);

  tile.appendChild(info);

  return tile;
}
