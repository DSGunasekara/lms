import express from 'express';
const router = express.Router();

import upload from '../Middleware/imageUpload.js';
import  {getUsers, getUser, createUser, updateUser, updatePassword, deleteUser, updateProfilePicture } from '../Controllers/userController.js';

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.patch('/:id', updateUser);
router.patch('/resetPassword/:id', updatePassword);
router.delete('/:id', deleteUser);
router.patch('/profile/:id', upload.single('file'), updateProfilePicture);

export default router;