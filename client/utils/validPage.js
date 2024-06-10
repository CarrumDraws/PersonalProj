export function validPage() {
  const validPages = [
    "/client/notfound/index.html",
    "/client/index.html",
    "/client/products/index.html",
    "/client/signup/index.html",
    "/client/login/index.html",
    "/client/admin/index.html",
  ];
  const currentPage = window.location.pathname;
  console.log(currentPage);
  if (!validPages.includes(currentPage)) {
    console.log("invalid page");
    // window.location.href = "/client/notfound/index.html";
  }
}
