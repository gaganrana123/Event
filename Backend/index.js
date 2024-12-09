import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDuRI;

console.log("MongoDB URI:", URI);

// Connect to MongoDB
mongoose
  .connect(URI)
  .then(() => console.log("Connected to mongoDB"))
  .catch((error) => console.error("Error connecting to mongoDB:", error));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
