const { Router } = require("express");
const userController = require("../controllers/UserController.js");
const {
  createUserValidation,
  loginUserValidation,
  updateUserValidation,
} = require("../middlewares/UserMiddleware.js");
const jwtValidation = require("../middlewares/AuthMiddleware.js");

const userRouter = Router();

// userRouter.get("/songs", jwtValidation, userController.getSongs);

userRouter.put(
  "/info",
  updateUserValidation,
  jwtValidation,
  userController.updateUser
);

// POST /user/signup : user signs up with username, email, and password
// Body: { username, email, password }
userRouter.post("/signup", createUserValidation, userController.signup);

// POST /user/login : user logs in with email and password
// Body: { email, password }
userRouter.post("/login", loginUserValidation, userController.login);

// POST /user/logout : user logs out w/ email
// { Auth: Token }
// userRouter.post("/logout", userController.logout);

module.exports = userRouter;
