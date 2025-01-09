// backend/model/notification.schema.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, required: true }, // 'event_request' or 'event_response'
  forRole: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// 'Admin' or 'Organizer'
  status: { type: String, default: 'unread' }, // 'unread' or 'read'
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model('Notification', notificationSchema);

export { Notification }; // Named export