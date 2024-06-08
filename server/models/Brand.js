const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const BrandSchema = new Schema({
  name: { type: String, required: true },
  products: [
    {
      type: refType, // Array of ObjectID's
      ref: "Product",
    },
  ],
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;
