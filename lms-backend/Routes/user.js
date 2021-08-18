import express from 'express';
const router = express.Router();

// import verify from '../Middleware/verify.js'
import  {getUsers, getUser, createUser, updateUser, updatePassword, deleteUser } from '../Controllers/userController.js';

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.patch('/resetPassword/:id', updatePassword);
router.delete('/:id', deleteUser);

export default router;