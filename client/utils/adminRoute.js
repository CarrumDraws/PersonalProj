export function adminRoute() {
  function isAdmin() {
    return !!(
      localStorage.getItem("token") && localStorage.getItem("user")?.admin
    );
  }
  if (!isAdmin()) {
    window.location.href = "/client/index.html";
  }
}
