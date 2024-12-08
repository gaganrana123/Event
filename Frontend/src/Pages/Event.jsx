import React from 'react';

const Events = () => {
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8">Manage Events</h2>
      
      {/* Event List Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Event ID</th>
              <th className="px-4 py-2 border-b">Event Name</th>
              <th className="px-4 py-2 border-b">Location</th>
              <th className="px-4 py-2 border-b">Date</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Event Row */}
            <tr>
              <td className="px-4 py-2 border-b">1</td>
              <td className="px-4 py-2 border-b">Wedding Ceremony</td>
              <td className="px-4 py-2 border-b">New York, USA</td>
              <td className="px-4 py-2 border-b">12/15/2024</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Add Event Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-500 text-white px-6 py-2 rounded-md">Add New Event</button>
      </div>
    </div>
  );
};

export default Events;
