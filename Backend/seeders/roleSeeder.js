import Role from '../model/role.schema.js'; // Adjust the path as needed

const seedRoles = async () => {
  const defaultRoles = [
    { role_Name: 'Admin' },
    { role_Name: 'User' },
    { role_Name: 'Organizer' },
  ];

  try {
    for (const role of defaultRoles) {
      const existingRole = await Role.findOne({ role_Name: role.role_Name });
      if (!existingRole) {
        await Role.create(role);
        console.log(`Role '${role.role_Name}' added to the database.`);
      } else {
        console.log(`Role '${role.role_Name}' already exists.`);
      }
    }
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};

export default seedRoles;
