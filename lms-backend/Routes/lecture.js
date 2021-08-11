import express from 'express';
const router = express.Router();
import upload from '../Middleware/imageUpload.js';

// import verify from '../Middleware/verify.js'
import  {getLectures, getLecture, createLecture, updateLecture, deleteLecture } from '../Controllers/lectureController.js';

router.get('/', getLectures);
router.get('/:id', getLecture);
router.post('/', upload.single('file'), createLecture);
router.patch('/:id', upload.single('file'), updateLecture);
router.delete('/:id', deleteLecture);

export default router;