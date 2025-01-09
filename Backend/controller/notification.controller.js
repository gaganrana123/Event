import { Notification } from '../model/notification.schema.js';
import { io } from '../index.js'; 

// Create new notification
export const createNotification = async (req, res) => {
  try {
    const { message, type, forRole, userId, eventStatus } = req.body;

    if (!message || !type || !forRole || !userId) {
      return res.status(400).json({ error: "Message, type, forRole, and userId are required." });
    }

    // Add dynamic message logic based on eventStatus if needed
    let notificationMessage = message;
    if (eventStatus) {
      if (eventStatus === "approved") {
        notificationMessage = "Your event has been approved.";
      } else if (eventStatus === "requestingApproval") {
        notificationMessage = "An organizer is requesting event approval.";
      }
    }

    const notification = await Notification.create({ message: notificationMessage, type, forRole, userId });

    // Emit the notification to all clients
    io.emit('new-notification', notification);

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications for a specific role
export const getNotifications = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res.status(400).json({ error: "Role is required." });
    }

    const notifications = await Notification.find({ forRole: role });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notifications for a specific user (by userId)
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Notification ID is required." });
    }

    const notification = await Notification.findByIdAndUpdate(id, { status: 'read' }, { new: true });
    
    if (!notification) {
      return res.status(404).json({ error: "Notification not found." });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send response notification to organizer
export const sendResponseToOrganizer = async (req, res) => {
  const { organizerId, message, type, forRole } = req.body;

  if (!type || !forRole || !message || !organizerId) {
    return res.status(400).json({ message: "Type, forRole, message, and organizerId are required." });
  }

  try {
    const newNotification = new Notification({
      message,
      type,
      forRole,
      userId: organizerId,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification sent to organizer", notification: newNotification });
  } catch (error) {
    res.status(500).json({ message: "Error sending notification", error: error.message });
  }
};