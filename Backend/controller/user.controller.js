import bcryptjs from 'bcryptjs';
import User from '../model/user.schema.js';  
import Role from '../model/role.schema.js'; 

export const signup = async (req, res) => {
    try {
        const { fullname, email, password, role } = req.body;

        // Check if the role is provided
        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Find the role by its name (User, Organizer, etc.)
        const foundRole = await Role.findOne({ role_Name: role });

        // If the role does not exist, return an error
        if (!foundRole) {
            console.error("Role not found:", role);
            return res.status(400).json({ message: "Invalid role" });
        }

        // Log the role being assigned (useful for debugging)
        console.log("Found role:", foundRole);

        // Hash the password before saving it
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create the new user with the found role ObjectId
        const createdUser = new User({
            fullname,
            email,
            password: hashedPassword,
            role: foundRole._id,  // Store the ObjectId of the role
        });

        // Save the user to the database
        await createdUser.save();

        // Respond with the newly created user data (including role name)
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                role: foundRole.role_Name,  // Return the role name instead of the ID
            },
        });
    } catch (error) {
        // Log the full error for debugging purposes
        console.error("Error during user creation:", error);

        // Send the error message and status to the client
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email and populate role
        const user = await User.findOne({ email }).populate('role');
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Respond with user details, including role_Name
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role.role_Name // Use role_Name for frontend routing
            }
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



