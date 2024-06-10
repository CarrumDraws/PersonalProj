export function adminRoute() {
  function isAdmin() {
    return !!(
      localStorage.getItem("token") &&
      JSON.parse(localStorage.getItem("user")).admin
    );
  }
  if (!isAdmin()) {
    window.location.href = "/client/index.html";
  }
}
