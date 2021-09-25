import express from 'express';
const router = express.Router();

import  {getTimetables, getTimetable, createTimetable, deleteTimetable, updateTimetable } from '../Controllers/timetableController.js';

router.get('/', getTimetables);
router.get('/:id', getTimetable);
router.post('/', createTimetable);
router.delete('/:id', deleteTimetable);
router.patch('/:id', updateTimetable);

export default router;