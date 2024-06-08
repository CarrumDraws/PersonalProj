const { Router } = require("express");
const ProductController = require("../controllers/ProductController.js");
const ProductMiddleware = require("../middlewares/ProductMiddleware.js");
const jwtValidation = require("../middlewares/AuthMiddleware.js");

const productRouter = Router();

// GET /products?page=x&brand=“”&type="" : display a list of products that match the search input based on artist name or song title, and filtering based on optional inputs such as language and genre.
productRouter.get(
  "/",
  ProductMiddleware.getProductsValidation,
  ProductController.getProducts
);

// GET /details/:productid : Get specific info about one product
productRouter.get("/details/:productid", ProductController.getProduct); // Wait but isnt PUT idempotent?

module.exports = productRouter;
