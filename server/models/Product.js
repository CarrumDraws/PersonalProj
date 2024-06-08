const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  brand: { type: refType, ref: "Brand", required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
