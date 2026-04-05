import express from "express";
import planController from "../controllers/plan.controller.js";
import authmiddleware from "../middlewares/auth.middleware.js";

const planRouter = express.Router();

planRouter.post("/generate", authmiddleware, planController.generate);
planRouter.get("/", authmiddleware, planController.getAll);

export default planRouter;
