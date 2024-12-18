// import User from '../model/user.schema.js';
// import bcryptjs from"bcryptjs";


export const signup= async (req, res)=>{
    try{
        const{fullname, email, password, role}=req.body;
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({message:"user already exist"});
        }
        const hashPassword=await bcryptjs.hash(password,10);
        const createdUser=new User({
            fullname:fullname,
            email:email,
            password:hashPassword,
            role:role,
        })
        await createdUser.save();
        res.status(201).json({message:"user created successfully", user:{
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
            role: createdUser.role 
        }});

    }
    catch(error){
        console.log("Error" +error.message);
        res.status(500).json({message:"Internal Server Error"});


    }
};

import User from '../model/user.schema.js';
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Respond with user details
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
