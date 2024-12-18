import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // For handling cross-origin requests
import eventRoutes from './routes/Event.routes.js'; // Import event routes
import userRoute from"./routes/user.route.js";

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Optional: Enable CORS for cross-origin requests (Customize if needed)
const corsOptions = {
  origin: '*', // Replace '*' with specific domain(s) if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Get MongoDB URI from environment variables
const URI = process.env.MongoDB_URI;

if (!URI) {
  console.error("ERROR: MongoDB URI is not defined. Please check your .env file.");
  process.exit(1); // Exit the app if the URI is missing
}

console.log("MongoDB URI:", URI);

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the app if the connection fails
  });

// Define API routes
app.use('/api/events', eventRoutes); // Update route prefix to '/api/events' for better RESTful conventions

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use("/user", userRoute);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
