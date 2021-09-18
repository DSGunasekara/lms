import express from 'express';
const router = express.Router();

import  {getTimetables, createTimetable, deleteTimetable, updateTimetable } from '../Controllers/timetableController.js';

router.get('/', getTimetables);
router.post('/', createTimetable);
router.delete('/:id', deleteTimetable);
router.patch('/:id', updateTimetable);

export default router;