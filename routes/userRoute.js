const userController = require("../controllers/userControllers");
// const authMiddleware = require("../middleware/index");
const userRouter = require("express").Router();

// userRouter.get("/users", authMiddleware, userController.getAll);
userRouter.post("/register", userController.addUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;