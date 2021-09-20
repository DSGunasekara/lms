import express from "express";
const router = express.Router();

import {
  getTask,
  createTask,
  getTasks,
  updateTask,
} from "../Controllers/todoListController.js";

router.post("/", createTask);
router.get("/:id", getTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);

export default router;
