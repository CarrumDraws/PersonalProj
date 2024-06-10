import { loadNavbar } from "./navbar/utils/loadNavbar.js";
import { loadFavorites } from "./favorites/utils/loadFavorites.js";
import { nonAdminRoute } from "./utils/nonAdminRoute.js";

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
      `http://localhost:3000/api/products${window.location.search}`,
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

  let flexRow = document.createElement("div");
  flexRow.style.display = "flex";
  flexRow.style.flexDirection = "row";
  flexRow.style.height = "33%";

  for (let i = 0; i < products.length; i++) {
    flexRow.append(createTile(products[i]));

    if (i % 3 == 2) {
      productSection.append(flexRow);
      flexRow = document.createElement("div");
      flexRow.style.display = "flex";
      flexRow.style.flexDirection = "row";
      flexRow.style.height = "33%";
    }
  }
  if (flexRow.hasChildNodes()) productSection.append(flexRow);
}

function createTile(product) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.addEventListener("click", () => {
    window.location.href = `products/index.html?productid=${product._id}`;
  });

  const img = document.createElement("div");
  img.classList.add("image-container");
  img.style.backgroundImage = `url(${product.image})`;
  tile.appendChild(img);

  const name = document.createElement("b");
  name.style.margin = "0";
  name.textContent = product.name;
  tile.appendChild(name);

  const rating = document.createElement("div");
  rating.textContent = `${product.rating} / 5 Stars`;
  tile.appendChild(rating);

  const price = document.createElement("h5");
  price.style.margin = "0";
  price.textContent = `$${product.price.toFixed(2)}`;
  tile.appendChild(price);

  const category = document.createElement("small");
  category.textContent = product.category + ` | ${product.brand}`;
  tile.appendChild(category);

  return tile;
}
