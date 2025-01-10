import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import axios from 'axios';
import crypto from 'crypto';
import seedRoles from './seeders/roleSeeder.js';
import seedPermissions from './seeders/PermissionSeeder.js';
import seedRolePermissions from './seeders/rolePermissionSeeder.js';
import seedUsers from './seeders/userSeeder.js';
import seedEvents from './seeders/eventSeeder.js';
import seedPayment from './seeders/paymentSeeder.js';
import eventRoutes from './routes/Event.routes.js';
import userRoute from './routes/user.route.js';
import roleRoute from './routes/role.route.js';
import paymentRoute from './routes/payment.routes.js';

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Configuration

const esewaConfig = {
  merchantId: "EPAYTEST",
  successUrl: "http://localhost:5173/payment-success",
  failureUrl: "http://localhost:5173/payment-failure",
  esewaPaymentUrl: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
  secret: "8gBm/:&EnhH.1/q",
};

// Routes
app.post('/api/payment/initiate', async (req, res) => {
  const { amount, productId } = req.body;

  if (!amount || !productId) {
    return res.status(400).json({ message: "Amount and productId are required." });
  }

  let paymentData = {
    amount,
    failure_url: esewaConfig.failureUrl,
    product_delivery_charge: "0",
    product_service_charge: "0",
    product_code: esewaConfig.merchantId,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    success_url: esewaConfig.successUrl,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: productId,
  };

  const dataString = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
  const signature = generateHmacSha256Hash(dataString, esewaConfig.secret);

  paymentData = { ...paymentData, signature };

  try {
    const response = await axios.post(esewaConfig.esewaPaymentUrl, null, {
      params: paymentData,
    });

    const parsedResponse = JSON.parse(safeStringify(response));
    if (parsedResponse.status === 200) {
      return res.status(200).json({ url: parsedResponse.request.res.responseUrl });
    } else {
      return res.status(500).json({
        message: "Failed to initiate payment with eSewa.",
        error: parsedResponse,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while initiating the payment.",
      error: error.message,
    });
  }
});

// Utility Functions
const generateHmacSha256Hash = (data, secret) => {
  if (!data || !secret) {
    throw new Error("Both data and secret are required to generate a hash.");
  }
  return crypto.createHmac("sha256", secret).update(data).digest("base64");
};

const safeStringify = (obj) => {
  const cache = new Set();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return; // Discard circular references
      }
      cache.add(value);
    }
    return value;
  });
};


// Validate environment variables
if (!process.env.MongoDB_URI) {
  console.error("ERROR: MongoDB URI is not defined. Please check your .env file.");
  process.exit(1);
}

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDB_URI;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to MongoDB");
    // Add clear indication of seeding process
    console.log("Starting database seeding...");
    // Execute seeds in proper order with status logging
    console.log("1. Seeding roles...");
    await seedRoles();
    console.log("2. Seeding permissions...");
    await seedPermissions();
    console.log("3. Seeding users...");
    await seedUsers();
    console.log("4. Seeding events...");
    await seedEvents();
    console.log("5. Seeding role permissions...");
    await seedRolePermissions();
    console.log("✓ Database seeding completed!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("\nShutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed.");
    process.exit(0);
  });
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// Initialize database connection
connectDB();

// API routes
app.use('/api/v1/events', eventRoutes); // Versioned API path
app.use('/api/v1/users', userRoute);
app.use('/api/v1/roles', roleRoute);
app.use('/api/v1/payments', paymentRoute);


// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


