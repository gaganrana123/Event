import Event from "../model/event.schema.js";

// Create a new event
export const createEvent = async (req, res) => {
  const { event_name, event_Date, location, host_ID, category_ID } = req.body;

  try {
    const newEvent = new Event({
      event_name,
      event_Date,
      location,
      host_ID,
      category_ID,
    });

    const savedEvent = await newEvent.save(); // Save the event to MongoDB
    res.status(201).json(savedEvent); // Respond with the saved event
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating event", error });
  }
};

// Get all events
// Updated getEvents controller
export const getEvents = async (req, res) => {
  const { search, location, category } = req.query;

  try {
    // Build query based on parameters
    const query = {};
    if (search) query.event_name = { $regex: search, $options: "i" }; // Case-insensitive search
    if (location) query.location = { $regex: location, $options: "i" };
    if (category) query.category_ID = category;

    const events = await Event.find(query)
      .populate("host_ID", "username email")
      .populate("category_ID", "categoryName");

    res.status(200).json(events); // Return filtered events
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching events", error });
  }
};


// Get a single event by ID
export const getEventById = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId)
      .populate("host_ID", "username email") // Populate host details
      .populate("category_ID", "categoryName"); // Populate category details

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event); // Respond with the single event
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching event", error });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  const eventId = req.params.id;
  const { event_name, event_Date, location, host_ID, category_ID } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { event_name, event_Date, location, host_ID, category_ID },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent); // Respond with the updated event
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating event", error });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" }); // Respond with success message
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting event", error });
  }
};
