// controllers/roleController.js
import Role from '../model/role.schema.js'; // Adjust path to your schema

// Function to create a new role
export const createRole = async (req, res) => {
  try {
    const { role_Name } = req.body;
    const existingRole = await Role.findOne({ role_Name });

    if (existingRole) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Role({
      role_Name,
    });

    await newRole.save();
    res.status(201).json({ message: "Role created successfully", role: newRole });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to fetch all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to verify if a user has a certain role
export const verifyRole = async (req, res) => {
  try {
    const { role_Name } = req.body; // Assuming the role is sent in the request body
    const role = await Role.findOne({ role_Name });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ message: `User has the ${role_Name} role` });
  } catch (error) {
    console.error("Error verifying role:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
