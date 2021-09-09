import express from 'express';
const router = express.Router();

import  {getTimetables, createTimetable, deleteTimetable } from '../Controllers/timetableController.js';

router.get('/', getTimetables);
router.post('/', createTimetable);
router.delete('/:id', deleteTimetable);

export default router;