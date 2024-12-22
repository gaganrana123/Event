import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/admin/users" className="hover:text-gray-400">Manage Users</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/events" className="hover:text-gray-400">Manage Events</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/venues" className="hover:text-gray-400">Manage Venues</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/reports" className="hover:text-gray-400">View Reports</Link>
          </li>
          <li className="mb-4">
            <Link to="/admin/settings" className="hover:text-gray-400">Settings</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Total Events Created</h3>
            <p className="text-3xl font-bold text-center">1,200+</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
            <p className="text-3xl font-bold text-center">10,000+</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Total Wedding Vendors</h3>
            <p className="text-3xl font-bold text-center">50+</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold">New Event Created: Wedding Ceremony</h4>
              <p>By Host: John Doe</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold">New User Registered: Jane Smith</h4>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold">New Vendor Added: Event Decorators</h4>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
