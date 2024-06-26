const { Router } = require("express");
const userController = require("../controllers/UserController.js");
const {
  createUserValidation,
  loginUserValidation,
} = require("../middlewares/UserMiddleware.js");
const { jwtValidation, isAdmin } = require("../middlewares/AuthMiddleware.js");

const userRouter = Router();

// POST /user/signup : user signs up with username, email, and password
// Body: { username, email, password }
userRouter.post("/signup", createUserValidation, userController.signup);

// POST /user/login : user logs in with email and password
// Body: { email, password }
userRouter.post("/login", loginUserValidation, userController.login);

// POST /user/logout : user logs out w/ email
// { Auth: Token }
// userRouter.post("/logout", userController.logout);

userRouter.get("/favorite", jwtValidation, userController.getFavorites);

userRouter.put(
  "/favorite/:productid",
  jwtValidation,
  userController.setFavorites
);

// Admin routes
userRouter.get("/", jwtValidation, isAdmin, userController.getUsers);
userRouter.get("/:id", jwtValidation, isAdmin, userController.getUserFavorites);

module.exports = userRouter;
