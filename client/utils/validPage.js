export function validPage() {
  const validPages = [
    "/client/notfound/index.html",
    "/client/index.html",
    "/client/products/index.html",
    "/client/signup/index.html",
    "/client/login/index.html",
    "/client/admin/index.html",
  ];
  // Normalize the current page path
  const currentPage = window.location.pathname
    .replace(/\/+$/, "")
    .toLowerCase();
  const isValidPage = validPages.some(
    (page) => page.toLowerCase() === currentPage
  );
  console.log(currentPage);

  if (!isValidPage) {
    console.log("Invalid page: redirecting to 404");
    window.location.replace("/client/notfound/index.html");
  }
}
