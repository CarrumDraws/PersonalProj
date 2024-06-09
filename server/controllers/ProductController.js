const mongoose = require("mongoose");

const User = require("../models/User.js");
const Product = require("../models/Product.js");
const Brand = require("../models/Brand.js");

const getProducts = async (req, res) => {
  try {
    // brand and type can be an array or null
    const { page, brand, type, id } = req.body;

    // Construct the query dynamically! One or more of these fields could be an empty array.
    const query = {};

    // Must Convert brand from string to ObjectID!
    if (brand && brand.length > 0) {
      const brandDocs = await Brand.find(
        { name: { $in: brand } }, // Search the Brand collection for docs where the 'name' field matches any brand in the brand[] array.
        "_id"
      ).exec();
      const brandIds = brandDocs.map((brandDoc) => brandDoc._id); // Convert to array of brandid's

      query.brand = { $in: brandIds }; // ($in operator matches any value in an array of values)
    }

    // Add category filter if category is provided
    if (type && type.length > 0) query.category = { $in: type };

    // Search Products w/ Pagination with Filtered Data
    let products = await Product.find(query)
      .skip((page - 1) * 9)
      .limit(9);

    // Initialize favorited flag to false for all products
    products = products.map((product) => ({
      ...product.toObject(),
      favorited: false,
    }));

    if (id) {
      const user = await User.findById(id).lean().exec(); // Get User
      if (user && user.favorites) {
        // Update favorited field for products in user favorites.
        // For each product...
        products.forEach((product) => {
          // ...if some of the user's favorites equal to the product's id...
          if (user.favorites.some((favorite) => favorite.equals(product._id))) {
            product.favorited = true; // ...update the favorited field for that product!
          }
        });
      }
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// GET /details/:productid
// id in body
const getProduct = async (req, res) => {
  try {
    const { productid } = req.params;
    const { id } = req.body;
    let product = await Product.findById(productid);
    if (!product) return res.status(404).json({ message: "Product not found" });
    product = {
      ...product.toObject(),
      favorited: false,
    };

    if (id) {
      const user = await User.findById(id).lean().exec(); // Get User
      if (user && user.favorites) {
        if (user.favorites.some((favorite) => favorite.equals(productid))) {
          product.favorited = true; // update the favorited field
        }
      }
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProducts,
  getProduct,
};
