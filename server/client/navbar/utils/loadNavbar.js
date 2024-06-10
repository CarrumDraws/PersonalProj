// Needs <div id="navbar-placeholder"></div> in body

export async function loadNavbar() {
  try {
    const response = await fetch("/navbar/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();

    document.getElementById("navbar-placeholder").innerHTML = data;

    // Load the CSS for the navbar panel
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/navbar/styles.css";
    document.head.appendChild(css);

    // Once navbar is loaded, load navbar script
    const script = document.createElement("script");
    script.src = "/navbar/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load the navbar:", err);
  }
}
