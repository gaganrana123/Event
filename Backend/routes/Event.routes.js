import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controller/Event.controller.js';

const router = express.Router();

router.post('/events', createEvent); // Route to create a new event
router.get('/events', getEvents); // Route to get all events
router.get('/events/:id', getEventById); // Route to get a specific event by ID
router.put('/events/:id', updateEvent); // Route to update an event
router.delete('/events/:id', deleteEvent); // Route to delete an event

export default router;
