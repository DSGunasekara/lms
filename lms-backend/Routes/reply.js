import express from 'express';
const router = express.Router();

import { getReplies, getReply, createReply, updateReply, deleteReply } from '../Controllers/replyController.js';

router.get('/', getReplies);
router.get('/:id', getReply);
router.post('/', createReply);
router.patch('/:id', updateReply);
router.delete('/:id', deleteReply);

export default router;