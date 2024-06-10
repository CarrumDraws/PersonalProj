export async function loadFavorites() {
  try {
    const response = await fetch("/favorites/index.html");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
    const favoritesPlaceholder = document.getElementById(
      "favorites-placeholder"
    );
    favoritesPlaceholder.innerHTML = data;

    // Load the CSS for the favorites panel
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/favorites/styles.css";
    document.head.appendChild(css);

    // Load the Bootstrap for the favorites panel
    const bs = document.createElement("link");
    bs.rel = "stylesheet";
    bs.href =
      "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    document.head.appendChild(bs);

    // Once favorites is loaded, load favorites script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "/favorites/script.js";
    document.body.appendChild(script);
  } catch (err) {
    console.error("Failed to load favorites:", err);
  }
}
