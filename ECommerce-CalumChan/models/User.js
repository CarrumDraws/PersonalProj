const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  favorites: [
    {
      type: refType, // Array of ObjectID's
      ref: "Product",
    },
  ],
  admin: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
