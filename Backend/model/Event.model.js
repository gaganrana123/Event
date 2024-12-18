import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String },
  password: { type: String, required: true },
  phone_no: { type: String },
  image: { type: String },
  role_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' } // Reference to Role collection
});

const User = mongoose.model('User', userSchema);

// Role Schema
const roleSchema = new mongoose.Schema({
  role_Name: { type: String, required: true }
});

const Role = mongoose.model('Role', roleSchema);

// Permission Schema
const permissionSchema = new mongoose.Schema({
  permissionName: { type: String, required: true }
});

const Permission = mongoose.model('Permission', permissionSchema);

// RolePermission Schema (many-to-many relation between Role and Permission)
const rolePermissionSchema = new mongoose.Schema({
  role_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }, // Reference to Role collection
  permission_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' } // Reference to Permission collection
});

const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);

// Event Schema
const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  event_Date: { type: Date, required: true },
  location: { type: String },
  host_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User collection (host)
  category_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category collection
});

const Event = mongoose.model('Event', eventSchema);

// Category Schema
const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  purchase_Date: { type: Date, default: Date.now },
  event_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }, // Reference to Event collection
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User collection
  payment_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMethod' } // Reference to PaymentMethod collection
});

const Booking = mongoose.model('Booking', bookingSchema);

// PaymentMethod Schema
const paymentSchema = new mongoose.Schema({
  paymentType: { type: String, required: true },
  amount: { type: Number, required: true },
  user_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User collection
});

const PaymentMethod = mongoose.model('PaymentMethod', paymentSchema);

// Export all models as one object
export default {
  User,
  Role,
  Permission,
  RolePermission,
  Event,
  Category,
  Booking,
  PaymentMethod
};
