// getFavorites
(async function getFavorites() {
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
