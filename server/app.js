const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routers/UserRouter.js");
const productRouter = require("./routers/ProductRouter.js");
// const artistRouter = require("./routers/ArtistRouter.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/products", productRouter);
// app.use("/artists", artistRouter);

app.all("*", (_req, res) => {
  return res.status(404).json({ message: "Not Found" });
});

module.exports = app;
