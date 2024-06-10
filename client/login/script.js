import { loadNavbar } from "/client/navbar/utils/loadNavbar.js";
import { validPage } from "/client/utils/validPage.js";
import { guestRoute } from "/client/utils/guestRoute.js";

document.addEventListener("DOMContentLoaded", () => {
  validPage();
  guestRoute();
  loadNavbar(); // Load the navbar
});

// Toggles between email and username
document.getElementById("toggleButton").addEventListener("click", function () {
  const usernameField = document.getElementById("usernameField");
  const emailField = document.getElementById("emailField");
  const toggleButton = document.getElementById("toggleButton");

  if (usernameField.classList.contains("hidden")) {
    usernameField.classList.remove("hidden");
    emailField.classList.add("hidden");
    toggleButton.textContent = "Use Email";
  } else {
    usernameField.classList.add("hidden");
    emailField.classList.remove("hidden");
    toggleButton.textContent = "Use Username";
  }
});

(function formSubmit() {
  let form = document.getElementsByTagName("form")[0];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submitting");

    if (validateForm()) {
      let formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        window.location.href = "../index.html";
      } catch (error) {
        console.error("Error:", error);
        document.getElementById("error-message").textContent =
          "Invalid Login Credentials";
      }
    }
  });
})();

function validateForm() {
  const username = document.getElementById("username")?.value;
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = "";

  // Validate username

  if (username) {
    const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
    if (!usernamePattern.test(username)) {
      errorMessage.textContent =
        "Username must be 5-15 characters long and contain no special characters.";
      return false;
    }
  }

  // Validate email
  if (email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (email.length < 6 || email.length > 30 || !emailPattern.test(email)) {
      errorMessage.textContent =
        "Email must be 6-30 characters long and in a valid format.";
      return false;
    }
  }

  // Validate password
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (!passwordPattern.test(password)) {
    errorMessage.textContent =
      "Password must be 6-10 characters long and include uppercase, lowercase, number, and special character.";
    return false;
  }

  return true;
}
