import express from "express";

import authController from "../controllers/auth.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.route("/register").post(authController.registeringUser);
authRouter.route("/login").post(authController.login);

authRouter.route("/user").get(authmiddleware, authController.usertokencheck);
export default authRouter;
