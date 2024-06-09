(function () {
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  if (localStorage.getItem("token")) {
    signupLink.style.display = "none";
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    signupLink.style.display = "block";
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
  }

  // Optionally, handle logout click event to clear the token and update the UI
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    signupLink.style.display = "block";
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/client/index.html";
  });
})();
