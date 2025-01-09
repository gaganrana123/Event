import mongoose from "mongoose";
import Event from "../model/event.schema.js";
import User from "../model/user.schema.js";
import Category from "../model/categories.schema.js";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const { org_ID, category } = req.body;

    // Fetch and validate organizer
    const organizer = await User.findById(org_ID);
    if (!organizer) {
      return res.status(404).json({ message: "Organizer not found" });
    }

    // Check organizer approval
    // if (!organizer.isApproved) {
    //   return res.status(403).json({ 
    //     message: "You are not authorized to create an event. Please wait for admin approval." 
    //   });
    // }

    // Validate category exists in the Category collection
    const validCategory = await Category.findById(category);
    if (!validCategory) {
      return res.status(400).json({ message: "Invalid category selected" });
    }

    // Validate registration deadline against event date
    if (new Date(req.body.registrationDeadline) >= new Date(req.body.event_date)) {
      return res.status(400).json({
        message: "Registration deadline must be before event date"
      });
    }

    // Validate event date is in the future
    if (new Date(req.body.event_date) <= new Date()) {
      return res.status(400).json({
        message: "Event date must be in the future"
      });
    }

    const newEvent = new Event({
      event_name: req.body.event_name.trim(),
      description: req.body.description.trim(),
      event_date: req.body.event_date,
      registrationDeadline: req.body.registrationDeadline,
      time: req.body.time,
      location: req.body.location.trim(),
      price: req.body.price,
      category: validCategory._id, // Store the validated category ID
      tags: req.body.tags ? req.body.tags.map(tag => tag.trim()) : [],
      image: req.body.image,
      org_ID,
      totalSlots: req.body.totalSlots,
      isPublic: req.body.isPublic,
      status: req.body.status || 'upcoming',
      attendees: []
    });

    const savedEvent = await newEvent.save();
    await savedEvent.populate([
      { path: "org_ID", select: "username email" },
      { path: "category", select: "categoryName" } // Only populate category name
    ]);
    
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error creating event", 
      error: error.message 
    });
  }
};

// Get all events
export const getEvents = async (req, res) => {
  const { search, location, category, priceRange, date, status } = req.query;

  try {
    const query = {};
    
    if (search) {
      query.$or = [
        { event_name: { $regex: search, $options: "i" }},
        { description: { $regex: search, $options: "i" }}
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    
    // Updated category query to use ObjectId
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    if (status && ['upcoming', 'ongoing', 'completed', 'cancelled'].includes(status)) {
      query.status = status;
    }

    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      query.price = { $gte: min || 0 };
      if (max) query.price.$lte = max;
    }

    if (date) {
      const searchDate = new Date(date);
      query.event_date = {
        $gte: searchDate,
        $lt: new Date(searchDate.setDate(searchDate.getDate() + 1))
      };
    }

    const events = await Event.find(query)
      .populate("org_ID", "username email")
      .populate("category") // Populate full category document
      .populate("attendees", "username email")
      .sort({ event_date: 1 });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error fetching events", 
      error: error.message 
    });
  }
};

export const getEventsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        message: "Invalid user ID format",
        details: "The provided user ID is not in the correct format"
      });
    }

    const events = await Event.find({ org_ID: userId })
      .populate("org_ID", "username email")
      .populate("category")
      .populate("attendees", "username email")
      .sort({ event_date: 1 });

    // Send empty array instead of 404 if no events found
    res.status(200).json(events);
  } catch (error) {
    console.error("Error in getEventsByUserId:", error);
    res.status(500).json({ 
      message: "Error fetching user events", 
      error: error.message 
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    const event = await Event.findById(req.params.id)
      .populate("org_ID", "username email")
      .populate("category")
      .populate("attendees", "username email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the event is public or if the user has permission to view it
    // You might want to add authorization logic here
    
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error fetching event", 
      error: error.message 
    });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // const organizer = await User.findById(event.org_ID);
    // if (!organizer.isApproved) {
    //   return res.status(403).json({ 
    //     message: "You are not authorized to update events. Please wait for admin approval." 
    //   });
    // }

    // Validate category ID if included in update
    if (req.body.category && !mongoose.Types.ObjectId.isValid(req.body.category)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    // Other validations remain the same...
    const updateData = { ...req.body };
    if (updateData.event_name) updateData.event_name = updateData.event_name.trim();
    if (updateData.description) updateData.description = updateData.description.trim();
    if (updateData.location) updateData.location = updateData.location.trim();
    if (updateData.tags) updateData.tags = updateData.tags.map(tag => tag.trim());
    
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true,
        runValidators: true
      }
    ).populate([
      { path: "org_ID", select: "username email" },
      { path: "category" }, // Populate full category document
      { path: "attendees", select: "username email" }
    ]);

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error updating event", 
      error: error.message 
    });
  }
};

// Delete method remains unchanged
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the event has already started or completed
    if (event.status !== 'upcoming') {
      return res.status(400).json({ 
        message: "Cannot delete an event that has already started or completed" 
      });
    }

    // Check if the organizer is still approved
    // const organizer = await User.findById(event.org_ID);
    // if (!organizer || !organizer.isApproved) {
    //   return res.status(403).json({ 
    //     message: "You are not authorized to delete events. Please contact admin." 
    //   });
    // }

    // If there are attendees, you might want to notify them
    if (event.attendees.length > 0) {
      // Here you could add notification logic for attendees
      console.log(`Event cancelled with ${event.attendees.length} attendees`);
    }

    await Event.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ 
      message: "Event successfully deleted",
      eventId: req.params.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error deleting event", 
      error: error.message 
    });
  }
};
