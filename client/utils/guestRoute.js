export function guestRoute() {
  function loggedIn() {
    return !!(localStorage.getItem("token") && localStorage.getItem("user"));
  }
  if (loggedIn()) {
    window.location.href = "/client/index.html";
  }
}
