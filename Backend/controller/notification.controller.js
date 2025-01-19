// controllers/notification.controller.js
import  Notification  from '../model/notification.schema.js';
import Event from '../model/event.schema.js';
import User from '../model/user.schema.js';

// Handle organizer request for event creation notification
export const requestEventNotification = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Fetch the event data and populate organizer details
    const event = await Event.findById(eventId).populate('org_ID', 'username');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Create notification for the Admin
    const notificationMessage = `Organizer ${event.org_ID.username} has created an event "${event.event_name}" and is awaiting approval.`;
    const notification = new Notification({
      message: notificationMessage,
      type: 'event_request',
      forRole: 'Admin',
      userId: event.org_ID._id,
    });

    await notification.save();
    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Error creating notification', error: error.message });
  }
};
export const approveEventNotification = async (req, res) => {
    const { eventId } = req.params; // Get the event ID from the request parameters
    const { status } = req.body;  // Get the status (either 'Approved' or 'Rejected') from the request body
    
    try {
      // Check if the status is valid ('Approved' or 'Rejected')
      if (status !== 'Approved' && status !== 'Rejected') {
        return res.status(400).json({ message: "Invalid status, must be 'Approved' or 'Rejected'" });
      }
  
      // Fetch the event by its ID
      const event = await Event.findByIdAndUpdate(
        eventId,
        { status },
        { new: true }
      );
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      // Fetch the organizer of the event
      const organizer = await User.findById(event.org_ID);
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
  
      // Construct the notification message based on the event status
      const notificationMessage = status === 'Approved'
        ? `Admin has approved your event request.`
        : `Admin has rejected your event request.`;
  
      // Create the notification for the organizer
      const notification = new Notification({
        message: notificationMessage,
        type: 'event_response',  // Specify the type of the notification
        forRole: 'Organizer',    // Send to the 'Organizer' role
        userId: organizer._id,   // The organizer's user ID
        status: 'unread',        // The notification is unread initially
      });
  
      await notification.save();
  
      // Optionally, you can also create a confirmation notification for the admin if required
      // const adminNotification = new Notification({
      //   message: `You have ${status.toLowerCase()} an event request.`,
      //   type: 'event_response',
      //   forRole: 'Admin',
      //   status: 'unread',  // Admin's notification status
      // });
  
      // await adminNotification.save();
  
      res.status(200).json({ message: `Notification sent to organizer about event ${status.toLowerCase()}.` });
    } catch (error) {
      console.error('Error sending event status notification:', error);
      res.status(500).json({ message: 'Error sending event status notification.' });
    }
  };

  // controllers/notification.controller.js
export const getUserNotifications = async (req, res) => {
    try {
      const { userId } = req.params;
      const notifications = await Notification.find({ userId: userId })
        .sort({ createdAt: -1 });
  
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching notifications.' });
    }
  };


  export const getAdminNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ forRole: 'Admin' ,type:'event_request'})
        .sort({ createdAt: -1 }); // Fetch notifications for Admin and sort by newest
  
      if (!notifications.length) {
        return res.status(404).json({ message: 'No notifications found.' });
      }
  
      res.status(200).json(notifications); // Return the notifications
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
      res.status(500).json({ message: 'Error fetching notifications.' });
    }
  };

  // notification.controller.js



// Controller to mark notification as read
export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;

  if (!notificationId || notificationId === 'undefined') {
    return res.status(400).json({ message: 'Invalid Notification ID' });
  }

  try {
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};