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
    const response = await fetch("../favorites/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const navbarPlaceholder = document.getElementById("favorites-placeholder");
    navbarPlaceholder.innerHTML = data;

    // Load the CSS for the favorites panel
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "../favorites/styles.css";
    document.head.appendChild(css);

    // Load the Bootstrap for the favorites panel
    const bs = document.createElement("link");
    bs.rel = "stylesheet";
    bs.href =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    document.head.appendChild(bs);

    // Once favorites is loaded, load favorites script
    const script = document.createElement("script");
    script.src = "../favorites/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load favorites:", err);
  }
})();

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
      `http://localhost:3000/products/details/${productid}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const product = await response.json();
    console.log("Success:", product);
    displayProductData(product);
    displayRelatedProducts(product.brand);
  } catch (error) {
    console.error("Error:", error);
  }
})();

function displayProductData(product) {
  let productDiv = document.getElementById("product");

  const tile = document.createElement("div");
  tile.style.display = "flex";
  tile.style.flexDirection = "row";
  tile.style.alignItems = "center";
  tile.style.textAlign = "center";

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

  const name = document.createElement("h1");
  name.textContent = product.name;
  name.style.margin = "0";
  info.appendChild(name);

  const rating = document.createElement("div");
  rating.textContent = `${product.rating} / 5 Stars`;
  info.appendChild(rating);

  const meta = document.createElement("div");
  meta.textContent = `${product.brand} | ` + product.category;
  info.appendChild(meta);

  const price = document.createElement("h1");
  price.textContent = `$${product.price.toFixed(2)}`;
  info.appendChild(price);

  const description = document.createElement("div");
  description.textContent = `${product.description}`;
  info.appendChild(description);

  const favorite = document.createElement("button");
  favorite.textContent = product.favorited
    ? "Remove from Favorites"
    : `Add to Favorites`;
  info.appendChild(favorite);

  favorite.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleFavorite(product._id);
  });

  tile.appendChild(info);

  productDiv.append(tile);
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

async function displayRelatedProducts(brand) {
  let morefromDiv = document.getElementById("morefrom");
  morefromDiv.innerHTML = `More From ${brand}`;

  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/products?brand=${brand}`,
      {
        method: "GET",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();
    displayRelatedProductsData(products);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayRelatedProductsData(products) {
  let related = document.getElementById("related");
  for (let i = 0; i < products.length; i++) {
    if (i > 2) break;
    related.append(createRelatedProductsTile(products[i]));
  }
}

function createRelatedProductsTile(product) {
  const tile = document.createElement("div");
  tile.style.display = "flex";
  tile.style.flexDirection = "row";
  tile.style.alignItems = "center";
  tile.style.textAlign = "center";

  tile.addEventListener("click", () => {
    console.log(product._id);
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
