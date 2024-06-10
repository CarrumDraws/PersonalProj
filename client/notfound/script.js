import { loadNavbar } from "/client/navbar/utils/loadNavbar.js";
import { validPage } from "/client/utils/validPage.js";

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar(); // Load the navbar
  validPage();
});
