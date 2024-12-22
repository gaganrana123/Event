// user.schema.js
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true }  // Ensure this is set to ObjectId
});


const User = mongoose.model('User', userSchema);
export default User;
