import express from "express";
const router = express.Router();

import { getDiscussions, getDiscussion, createDiscussion, updateDiscussion, deleteDiscussion } from "../Controllers/discussionController.js";

router.get('/', getDiscussions);
router.get('/:id', getDiscussion);
router.post('/', createDiscussion);
router.patch('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);

export default router;