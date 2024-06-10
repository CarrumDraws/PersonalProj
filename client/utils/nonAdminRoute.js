export function nonAdminRoute() {
  function isAdmin() {
    return !!(
      localStorage.getItem("token") && localStorage.getItem("user")?.admin
    );
  }
  if (isAdmin()) {
    window.location.href = "/client/admin/index.html";
  }
}
