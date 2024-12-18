import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ["User", "Organizer", "Admin"], // Allowed roles
        required: true,
    },

})
const User=mongoose.model("User",userSchema);
export default User;