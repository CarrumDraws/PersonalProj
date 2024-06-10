import { loadNavbar } from "/client/navbar/utils/loadNavbar.js";
import { loadFavorites } from "/client/favorites/utils/loadFavorites.js";
import { nonAdminRoute } from "/client/utils/nonAdminRoute.js";

document.addEventListener("DOMContentLoaded", () => {
  nonAdminRoute();
  loadNavbar(); // Load the navbar
  loadFavorites(); // Load the Favorites Panel
});

// Configure Form + Pagenav
(async function configure() {
  try {
    const params = new URLSearchParams(window.location.search);

    // Check brand checkboxes
    const brandCheckboxes = document.querySelectorAll(".brandCheckbox");
    brandCheckboxes.forEach((checkbox) => {
      if (
        params.has("brand") &&
        params.getAll("brand").includes(checkbox.value)
      )
        checkbox.checked = true;
    });

    // Check category checkboxes
    const categoryCheckboxes = document.querySelectorAll(".typeCheckbox");
    categoryCheckboxes.forEach((checkbox) => {
      if (params.has("type") && params.getAll("type").includes(checkbox.value))
        checkbox.checked = true;
    });

    // Configure PageNav
    let prevPage = document.getElementById("prevPage");
    let currPage = document.getElementById("currPage");
    let nextPage = document.getElementById("nextPage");
    const pageNum = params.get("page");
    currPage.innerHTML = pageNum ? pageNum : "1";
    prevPage.style.color = !pageNum || pageNum == "1" ? "lightgray" : "black";
    prevPage.addEventListener("click", () => {
      if (!pageNum || pageNum == "1") return;

      const nextPageNum = Number(pageNum) - 1;
      const url = new URL(window.location.href);
      url.searchParams.set("page", nextPageNum.toString());
      window.location.href = url.toString();
    });
    nextPage.addEventListener("click", () => {
      let nextPageNum;
      if (!pageNum || pageNum == "1") nextPageNum = 2;
      else nextPageNum = Number(pageNum) + 1;

      const url = new URL(window.location.href);
      url.searchParams.set("page", nextPageNum.toString());
      window.location.href = url.toString();
    });
  } catch (err) {
    console.error("Failed to configure:", err);
  }
})();

// Form Submission
(function formSubmit() {
  let form = document.getElementsByTagName("form")[0];

  // When filtering, change URL
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.delete("brand");
    url.searchParams.delete("type");

    // Get selected brands
    document.querySelectorAll(".brandCheckbox:checked").forEach((checkbox) => {
      url.searchParams.append("brand", checkbox.value);
    });

    // Get selected categories
    document.querySelectorAll(".typeCheckbox:checked").forEach((checkbox) => {
      url.searchParams.append("type", checkbox.value);
    });

    window.location.href = url.toString();
  });
})();

// getData
(async function getData() {
  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/products${window.location.search}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();
    console.log("Success:", products);
    displayData(products);
  } catch (error) {
    console.error("Error:", error);
  }
})();

function displayData(products) {
  let productSection = document.getElementById("product-placeholder");
  // products is an array of brand, category, description, favorited, image, name, price, rating, _id.

  let flexRow = document.createElement("div");
  flexRow.style.display = "flex";
  flexRow.style.flexDirection = "row";

  for (let i = 0; i < products.length; i++) {
    flexRow.append(createTile(products[i]));

    if (i % 3 == 2) {
      productSection.append(flexRow);
      flexRow = document.createElement("div");
      flexRow.style.display = "flex";
      flexRow.style.flexDirection = "row";
    }
  }
  if (flexRow.hasChildNodes()) productSection.append(flexRow);
}

// product is an object of brand, category, description, favorited, image, name, price, rating, _id.
function createTile(product) {
  const tile = document.createElement("div");
  tile.style.display = "flex";
  tile.style.flexDirection = "column";
  tile.style.alignItems = "center";
  tile.style.textAlign = "center";
  tile.style.width = "33%";

  tile.addEventListener("click", () => {
    window.location.href = `products/index.html?productid=${product._id}`;
  });

  const img = document.createElement("img");
  img.style.width = "100%";
  img.style.height = "auto";
  img.style.aspectRatio = "1 / 1";
  img.src = product.image;
  img.alt = product.name;
  tile.appendChild(img);

  const name = document.createElement("h6");
  name.textContent = product.name;
  tile.appendChild(name);

  const category = document.createElement("div");
  category.textContent = product.category + ` | ${product.brand}`;
  tile.appendChild(category);

  const rating = document.createElement("div");
  rating.textContent = `${product.rating} / 5 Stars`;
  tile.appendChild(rating);

  const price = document.createElement("div");
  price.textContent = `$${product.price.toFixed(2)}`;
  tile.appendChild(price);

  const favorite = document.createElement("button");
  favorite.textContent = product.favorited
    ? "Remove from Favorites"
    : `Add to Favorites`;
  tile.appendChild(favorite);

  favorite.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(product._id);
  });

  return tile;
}

async function toggleFavorite(productId) {
  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/user/favorite/${productId}`,
      {
        method: "PUT",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Failed to toggle favorite");

    window.location.reload(); // Reload page
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}
