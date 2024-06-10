export function nonAdminRoute() {
  function isAdmin() {
    return !!(
      localStorage.getItem("token") &&
      JSON.parse(localStorage.getItem("user")).admin
    );
  }
  if (isAdmin()) {
    window.location.href = "/admin/index.html";
  }
}
