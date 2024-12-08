import React from 'react';

const Users = () => {
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Manage Users</h2>
      
      {/* User List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">User ID</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Role</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example User Row */}
            <tr>
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b">John Doe</td>
              <td className="px-4 py-2 border-b">johndoe@example.com</td>
              <td className="px-4 py-2 border-b">Admin</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Add User Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-500 text-white px-6 py-2 rounded-md">Add New User</button>
      </div>
    </div>
  );
};

export default Users;
