import mongoose from "mongoose";

// Event Schema
const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  event_Date: { type: Date, required: true },
  location: { type: String },
  host_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User collection (host)
  category_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category collection
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
