import { loadNavbar } from "/navbar/utils/loadNavbar.js";

import { guestRoute } from "/utils/guestRoute.js";

document.addEventListener("DOMContentLoaded", () => {
  guestRoute();
  loadNavbar(); // Load the navbar
});

(function formSubmit() {
  let form = document.getElementsByTagName("form")[0];

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting

    if (validateForm()) {
      console.log("Form Validated");

      let formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const response = await fetch("http://localhost:3000/api/user/signup", {
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
          "Username/Email Already Exist";
      }
    }
  });
})();

function validateForm() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordCheck = document.getElementById("passwordCheck").value;
  const errorMessage = document.getElementById("error-message");

  errorMessage.textContent = "";

  // Validate username
  const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;
  if (!usernamePattern.test(username)) {
    errorMessage.textContent =
      "Username must be 5-15 characters long and contain no special characters.";
    return false;
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (email.length < 6 || email.length > 30 || !emailPattern.test(email)) {
    errorMessage.textContent =
      "Email must be 6-30 characters long and in a valid format.";
    return false;
  }

  // Validate password
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (!passwordPattern.test(password)) {
    errorMessage.textContent =
      "Password must be 6-10 characters long and include uppercase, lowercase, number, and special character.";
    return false;
  }

  // Validate password confirmation
  if (password !== passwordCheck) {
    errorMessage.textContent = "Passwords do not match.";
    return false;
  }
  return true;
}
