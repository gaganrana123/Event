import bcryptjs from 'bcryptjs';  // Import bcryptjs instead of bcrypt
import User from '../model/user.schema.js'; // Import User schema
import Role from '../model/role.schema.js'; // Import Role schema

const seedUsers = async () => {
  try {
    // Fetch Role IDs
    const adminRole = await Role.findOne({ role_Name: 'Admin' });
    const userRole = await Role.findOne({ role_Name: 'User' });
    const organizerRole = await Role.findOne({ role_Name: 'Organizer' });

    if (!adminRole || !userRole || !organizerRole) {
      console.error('Roles are not seeded yet. Please seed roles first.');
      return;
    }

    // User data
    const users = [
      {
        fullname: 'admin',
        email: 'admin@example.com',
        password: await bcryptjs.hash('admin123', 10), // Hash password using bcryptjs
        role: adminRole._id,
      },
      {
        fullname: 'user',
        email: 'user@example.com',
        password: await bcryptjs.hash('user123', 10), // Hash password using bcryptjs
        role: userRole._id,
      },
      {
        fullname: 'organizer',
        email: 'organizer@example.com',
        password: await bcryptjs.hash('organizer123', 10), // Hash password using bcryptjs
        role: organizerRole._id,
      },
    ];

    // Check if users already exist
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log('Users already seeded.');
      return;
    }

    // Seed users
    await User.insertMany(users);
    console.log('Users seeded successfully.');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
};

export default seedUsers;
