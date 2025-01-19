import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    type: { type: String, required: true }, // Type of notification (e.g., 'event-created', 'user-registered', etc.)
    forRole: { type: String, required: true }, // Role that should receive the notification (e.g., 'Admin')
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who receives the notification (in this case, the admin)
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: false }, // Reference to Event (optional, for event-related notifications)
    status: { type: String, default: 'unread' }, // Status of the notification (unread or read)
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;