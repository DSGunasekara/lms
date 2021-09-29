import express from "express";
const router = express.Router();

import {
  getLectures,
  getLecture,
  createLecture,
  updateLecture,
  deleteLecture,
} from "../Controllers/lectureController.js";

router.get("/", getLectures);
router.get("/:id", getLecture);
router.post("/", createLecture);
router.patch("/:id", updateLecture);
router.delete("/:id", deleteLecture);

export default router;
