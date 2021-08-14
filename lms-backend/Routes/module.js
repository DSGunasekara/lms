import express from 'express';
const router = express.Router();

// import verify from '../Middleware/verify.js'
import  {getModules, getModule, createModule, updateModule, deleteModule } from '../Controllers/moduleController.js';

router.get('/', getModules);
router.get('/:id', getModule);
router.post('/', createModule);
router.patch('/:id', updateModule);
router.delete('/:id', deleteModule);

export default router;