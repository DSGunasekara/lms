import express from "express";
const router = express.Router();

import {
  getTask,
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../Controllers/todoListController.js";

router.post("/", createTask);
router.get("/:id", getTask);
router.get("/", getTasks);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
