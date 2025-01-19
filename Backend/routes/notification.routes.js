// routes/notification.routes.js
import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { protectAdmin } from '../middleware/adminMiddleware.js';
import { requestEventNotification, approveEventNotification, getUserNotifications, getAdminNotifications,markAsRead } from '../controller/notification.controller.js';

const router = express.Router();

// Route to send event creation request notification to admin
router.post('/request-event', authenticateUser, requestEventNotification);

// Route to send approval notification to organizer
router.post('/approve-event/:eventId', authenticateUser, protectAdmin, approveEventNotification);


router.get('/admin-notifications', protectAdmin, getAdminNotifications);
router.patch('/mark-read/:notificationId', markAsRead);

// Route to fetch notifications for a user (Admin/Organizer)
router.get('/notify',authenticateUser, getUserNotifications);




export default router;