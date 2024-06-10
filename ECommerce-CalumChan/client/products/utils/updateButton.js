export function updateButton(id) {
  const urlParams = new URLSearchParams(window.location.search);
  let productid = urlParams.get("productid");

  if (id == productid) {
    const favorite = document.getElementById("favorite");
    let currHtml = favorite.innerHTML;
    favorite.innerHTML =
      currHtml === `Add to Favorites`
        ? "Remove from Favorites"
        : `Add to Favorites`;
    favorite.classList.remove(...favorite.classList);
    favorite.classList.add("btn");
    favorite.classList.add(
      currHtml === `Add to Favorites` ? "btn-secondary" : "btn-primary"
    );
  }
}
