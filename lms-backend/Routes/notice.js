import express from "express";
const router = express.Router();
import upload from "../Middleware/imageUpload.js";

import {
  getNotices,
  getNotice,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../Controllers/noticeController.js";

router.get("/", getNotices);
router.get("/:id", getNotice);
router.post("/", createNotice);
router.patch("/:id", updateNotice);
router.delete("/:id", deleteNotice);

export default router;
