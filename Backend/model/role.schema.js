import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role_Name: { type: String, required: true },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;  // This ensures you can import using 'import Role from ...'
