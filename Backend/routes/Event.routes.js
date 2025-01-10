import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  getEventByIdName,
  updateEvent,
  deleteEvent,
 
} from '../controller/Event.controller.js';

const router = express.Router();

// Define routes
router.post('/create', createEvent);        // POST /api/v1/events/create
router.get('/', getEvents);                 // GET /api/v1/events
router.get('/:id', getEventById);           // GET /api/v1/events/:id
router.get('/:id/name', getEventByIdName);  // GET /api/v1/events/:id/name
router.put('/update/:id', updateEvent);     // PUT /api/v1/events/update/:id
router.delete('/delete/:id', deleteEvent); 


export default router;