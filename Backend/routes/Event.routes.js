import express from 'express';
import {
  createEvent,
  getEvents,
  getEventsByUserId,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controller/Event.controller.js';

const router = express.Router();

// Define routes with clear hierarchy
router.post('/create', createEvent);
router.get('/', getEvents);
router.get('/user/:userId', getEventsByUserId);  // to get all events form that userID
router.get('/:id', getEventById);               // to get a specific event by id
router.put('/update/:id', updateEvent);
router.delete('/delete/:id', deleteEvent);

export default router;