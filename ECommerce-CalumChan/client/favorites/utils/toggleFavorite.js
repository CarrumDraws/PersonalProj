import { updateFavoritePanel } from "../script.js";
import { updateButton } from "../../products/utils/updateButton.js";

export async function toggleFavorite(product) {
  try {
    let token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(
      `http://localhost:3000/api/user/favorite/${product._id}`,
      {
        method: "PUT",
        headers: headers,
      }
    );

    if (!response.ok) throw new Error("Failed to toggle favorite");

    updateFavoritePanel(product);
    updateButton(product._id);
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
}
