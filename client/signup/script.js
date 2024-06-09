(async function getNavbar() {
  try {
    const response = await fetch("../navbar");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    navbarPlaceholder.innerHTML = data;
  } catch (err) {
    console.error("Failed to load the navbar:", err);
  }
})();

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent the form from submitting

  let formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  console.log(data);
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

      if (!response.ok) {
        console.log(response);
        throw new Error(response.message);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
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
