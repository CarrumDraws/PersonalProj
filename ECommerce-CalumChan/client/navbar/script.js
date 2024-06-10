function isLoggedIn() {
  return !!localStorage.getItem("token");
}

(function () {
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-link");
  if (isLoggedIn()) {
    signupLink.style.display = "none";
    loginLink.style.display = "none";
    logoutLink.style.display = "block";
  } else {
    signupLink.style.display = "block";
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
  }

  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    signupLink.style.display = "block";
    loginLink.style.display = "block";
    logoutLink.style.display = "none";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/index.html";
  });
})();
