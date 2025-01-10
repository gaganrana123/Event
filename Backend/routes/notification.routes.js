import express from 'express';
import { handleEventApproval,
    getNotifications,} from  '../controller/Event.controller.js';

const router = express.Router();

router.patch('/approve/:id', handleEventApproval);
router.get('/notifications/:id', getNotifications); 