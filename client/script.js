// Load the navbar
(async function getNavbar() {
  try {
    const response = await fetch("navbar/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    navbarPlaceholder.innerHTML = data;

    // Once navbar is loaded, load navbar script
    const script = document.createElement("script");
    script.src = "navbar/script.js";
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

    // Once favorites is loaded, load favorites script
    const script = document.createElement("script");
    script.src = "favorites/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load favorites:", err);
  }
})();

// Configure pagenav
(async function configureNav() {
  try {
    let prevPage = document.getElementById("prevPage");
    let currPage = document.getElementById("currPage");
    let nextPage = document.getElementById("nextPage");
    const params = new URLSearchParams(window.location.search);
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
    console.error("Failed to configureNav:", err);
  }
})();

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
    console.log(product._id);
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
  category.textContent = product.category;
  tile.appendChild(category);

  const rating = document.createElement("div");
  rating.textContent = `${product.rating} / 5 Stars`;
  tile.appendChild(rating);

  const price = document.createElement("div");
  price.textContent = `$${product.price.toFixed(2)}`;
  tile.appendChild(price);

  const brand = document.createElement("div");
  brand.textContent = `Brand: ${product.brand}`;
  tile.appendChild(brand);

  return tile;
}
