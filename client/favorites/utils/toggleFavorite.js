export async function toggleFavorite(productId) {
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
