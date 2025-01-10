import Permission from '../model/permission.schema.js';

const permissions = [
  'CREATE_EVENT',
  'DELETE_EVENT',
  'VIEW_EVENT',
  'MANAGE_USERS'
];

const seedPermissions = async () => {
  for (const permissionName of permissions) {
    const existingPermission = await Permission.findOne({ permissionName });
    if (existingPermission) {
      console.log(`Permission '${permissionName}' already exists.`);
    } else {
      const newPermission = new Permission({ permissionName });
      await newPermission.save();
      console.log(`Permission '${permissionName}' created.`);
    }
  }
};

export default seedPermissions;
