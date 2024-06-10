import { loadNavbar } from "/client/navbar/utils/loadNavbar.js";

import { guestRoute } from "/client/utils/guestRoute.js";

document.addEventListener("DOMContentLoaded", () => {
  guestRoute();
  loadNavbar(); // Load the navbar
});

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the form from submitting

  let formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  if (data.password !== data.passwordCheck)
    document.getElementById("error-message").textContent =
      "Passwords do not match";
  else {
    document.getElementById("error-message").textContent = "";

    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(response.message);

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("user", JSON.stringify(responseData.user));
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("error-message").textContent =
        "Error Creating User";
    }
  }
});
