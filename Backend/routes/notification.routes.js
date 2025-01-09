// backend/routes/notificationRoutes.js
import express from 'express';
import { createNotification, getNotifications, markAsRead,sendResponseToOrganizer } from '../controller/notification.controller.js';

const router = express.Router();

// Route to create a new notification
router.post("/createnotification", createNotification);
// Route to fetch all notifications
router.get("/getnotify", getNotifications);
// Route to mark a notification as read
router.patch("/:notificationId", markAsRead);
router.post('/response', sendResponseToOrganizer);

export default router;  // Default export of the router