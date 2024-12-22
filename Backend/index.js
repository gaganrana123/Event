import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import eventRoutes from './routes/Event.routes.js'; 
import userRoute from './routes/user.route.js'; 
import roleRoute from './routes/role.route.js';
import seedRoles from './seeders/roleSeeder.js'; 
import seedUsers from './seeders/userSeeder.js';

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for cross-origin requests
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
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
  process.exit(1); 
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    await seedRoles();
    await seedUsers();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); 
  }
};
connectDB();

// Define API routes
app.use('/api/events', eventRoutes);
app.use('/user', userRoute);
app.use('/api/roles', roleRoute); // Define route for roles

// Health check endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
