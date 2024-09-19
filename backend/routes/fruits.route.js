import express from "express";
import { getFruits, createFruit, updateFruit, deleteFruit } from "../controllers/fruits.controller.js";

const router = express.Router();

router.get("/get-fruits", getFruits);
router.post("/create-fruit", createFruit);
router.put("/update-fruit/:id", updateFruit);
router.delete("/delete-fruit/:id", deleteFruit);

export { router as fruitsRouter };