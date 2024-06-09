fetch("../navbar")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-placeholder").innerHTML = data;
  })
  .catch((err) => {
    console.log(err);
  });

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

let form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", async (e) => {
  e.preventDefault();
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
    console.log("Success:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
});
