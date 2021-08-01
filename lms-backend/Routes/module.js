import express from 'express';
const router = express.Router();

// import verify from '../Middleware/verify.js'
import  {getModules, getModule, createUser, updateModule, deleteModule } from '../Controllers/moduleController.js';

router.get('/', getModules);
router.get('/:id', getModule);
router.post('/', createUser);
router.patch('/:id', updateModule);
router.delete('/:id', deleteModule);

export default router;