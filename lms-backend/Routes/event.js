import express from 'express';
const router = express.Router();
import upload from '../Middleware/imageUpload.js';

// import verify from '../Middleware/verify.js'
import  {getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../Controllers/eventController.js';

router.get('/', getEvents);
router.get('/:id', getEvent);
router.post('/', createEvent);
router.patch('/:id', updateEvent);
router.delete('/:id', deleteEvent);

export default router;