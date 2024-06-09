// Load the navbar
fetch("./navbar")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch((err) => {
    console.log(err);
  });

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

// getData
async function getData() {
  try {
    const response = await fetch(
      `http://localhost:3000/products${window.location.search}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json();
    console.log("Success:", products);
    displayData(products);
  } catch (error) {
    console.error("Error:", error);
  }
}
getData();

let productSection = document.getElementById("product-placeholder");

function displayData(products) {
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

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  tile.appendChild(img);

  const name = document.createElement("h2");
  name.textContent = product.name;
  tile.appendChild(name);

  const category = document.createElement("p");
  category.textContent = product.category;
  tile.appendChild(category);

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${product.rating}`;
  tile.appendChild(rating);

  const price = document.createElement("p");
  price.textContent = `Price: $${product.price.toFixed(2)}`;
  tile.appendChild(price);

  const brand = document.createElement("p");
  brand.textContent = `Brand: ${product.brand}`;
  tile.appendChild(brand);

  return tile;
}
