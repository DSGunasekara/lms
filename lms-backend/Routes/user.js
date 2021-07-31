import express from 'express';
const router = express.Router();

import verify from '../Middleware/verify.js'
import  {getUsers, getUser, createUser, updateUser, updatePassword, deleteUser } from '../Controllers/userController.js';

router.get('/', verify, getUsers);
router.get('/:id', verify, getUser);
router.post('/', createUser);
router.patch('/:id', verify, updateUser);
router.patch('/resetPassword/:id', verify, updatePassword);
router.delete('/:id', verify, deleteUser);

export default router;