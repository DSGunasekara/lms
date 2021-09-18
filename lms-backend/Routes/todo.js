import express from 'express';
const router = express.Router();

import { getTask, createTask, getTasks } from '../Controllers/todoListController.js';

router.post('/', createTask);
router.get('/:id', getTask);
router.get('/', getTasks);

export default router;