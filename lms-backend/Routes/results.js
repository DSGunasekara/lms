import express from 'express';
const router = express.Router();

import  {getResults, createResult, getResult, updateResult, deleteResult } from '../Controllers/resultController.js';

router.get('/', getResults);
router.get('/:id', getResult);
router.post('/', createResult);
router.patch('/:id', updateResult);
router.delete('/:id', deleteResult);

export default router;