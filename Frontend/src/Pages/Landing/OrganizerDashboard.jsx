import { useState } from "react";
import { Menu, Plus, List, BarChart3, Settings, HelpCircle, Bell, LogOut, User } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
// import axios from "axios";
// import api from "../utils/api";

const OrganizerDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/loginsignup";
  };

  const tabs = [
    { label: "Overview", icon: BarChart3 },
    { label: "Create Event", icon: Plus },
    { label: "My Events", icon: List },
    { label: "Settings", icon: Settings },
    { label: "Help", icon: HelpCircle },
  ];

  const chartData = [
    { name: "Total Events", count: 12 },
    { name: "Pending Approvals", count: 5 },
    { name: "Upcoming Events", count: 7 },
  ];

  const handleCreateEvent = async (event) => {
    event.preventDefault();

    const eventData = {
      event_name: event.target.event_name.value,
      description: event.target.description.value,
      event_date: event.target.event_date.value,
      registrationDeadline: event.target.registrationDeadline.value,
      time: event.target.time.value,
      location: event.target.location.value,
      price: event.target.price.value,
      category: event.target.category.value,
      tags: event.target.tags.value.split(",").map((tag) => tag.trim()),
      image: event.target.image.value,
      org_ID: "67738fad103ca82546f5dab2", // Example org_ID
      totalSlots: event.target.totalSlots.value,
      isPublic: event.target.isPublic.checked,
    };

    try {
      const response = await fetch("/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Event created successfully!");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("An error occurred while creating the event.");
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      case "Create Event":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
            <form className="bg-white p-6 rounded-lg shadow space-y-6" onSubmit={handleCreateEvent}>
              {/* Event Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1" htmlFor="event_name">
                      Event Name
                    </label>
                    <input id="event_name" name="event_name" type="text" placeholder="Enter event name" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="category">
                      Category
                    </label>
                    <select id="category" name="category" className="w-full p-2 border rounded">
                      <option value="">Select a category</option>
                      <option value="trending">Trending</option>
                      <option value="educational">Educational</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block font-medium mb-1" htmlFor="description">
                      Description
                    </label>
                    <textarea id="description" name="description" placeholder="Provide a detailed description of the event" className="w-full p-2 border rounded" rows="4"></textarea>
                  </div>
                </div>
              </div>

              {/* Date and Time Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Date & Time</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1" htmlFor="event_date">
                      Event Date
                    </label>
                    <input id="event_date" name="event_date" type="date" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="time">
                      Time
                    </label>
                    <input id="time" name="time" type="time" className="w-full p-2 border rounded" />
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block font-medium mb-1" htmlFor="registrationDeadline">
                      Registration Deadline
                    </label>
                    <input id="registrationDeadline" name="registrationDeadline" type="date" className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>

              {/* Location and Pricing Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Location & Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1" htmlFor="location">
                      Location
                    </label>
                    <input id="location" name="location" type="text" placeholder="Enter event location" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="price">
                      Price (in USD)
                    </label>
                    <input id="price" name="price" type="number" placeholder="Enter ticket price" className="w-full p-2 border rounded" />
                  </div>
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Additional Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1" htmlFor="tags">
                      Tags
                    </label>
                    <input id="tags" name="tags" type="text" placeholder="Add tags (e.g., books, fairs)" className="w-full p-2 border rounded" />
                    <small className="text-gray-500">Separate tags with commas.</small>
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="image">
                      Image URL
                    </label>
                    <input id="image" name="image" type="text" placeholder="Provide an image URL" className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block font-medium mb-1" htmlFor="totalSlots">
                      Total Slots
                    </label>
                    <input id="totalSlots" name="totalSlots" type="number" placeholder="Enter total slots available" className="w-full p-2 border rounded" />
                  </div>
                  <div className="flex items-center">
                    <input id="isPublic" name="isPublic" type="checkbox" className="mr-2" />
                    <label className="font-medium" htmlFor="isPublic">
                      Make this event public
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                Create Event
              </button>
            </form>
          </div>
        );
      case "My Events":
        return <div>Your events will be displayed here.</div>;
      case "Settings":
        return <div>Configure your dashboard settings here.</div>;
      case "Help":
        return <div>Find answers to your questions here.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? "w-64" : "w-16"} bg-gray-800 text-white h-screen transition-all`}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-2xl font-semibold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
            Organizer Dashboard
          </h1>
          <Menu onClick={() => setSidebarOpen(!isSidebarOpen)} className="cursor-pointer text-white" />
        </div>
        <ul className="space-y-4 mt-8">
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={`flex items-center space-x-3 px-6 py-2 cursor-pointer ${
                activeTab === tab.label ? "bg-blue-600 text-white" : "hover:bg-blue-700"
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              <tab.icon className="w-5 h-5" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>{tab.label}</span>
            </li>
          ))}
          {/* Logout Button */}
          <li
            className="flex items-center space-x-3 px-6 py-2 cursor-pointer hover:bg-blue-700"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 text-white" />
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar (Profile, Notifications, and Logout) */}
        <div className="flex justify-between items-center p-4">
          {/* Logo or Dashboard Title */}
          <div className="flex items-center">
            <h1 className={`text-2xl font-semibold transition-all ${isSidebarOpen ? "block" : "hidden"}`}>
              Organizer Dashboard
            </h1>
          </div>

          {/* Menu Icon (for sidebar toggle) */}
          <Menu onClick={() => setSidebarOpen(!isSidebarOpen)} className="cursor-pointer text-white" />

          {/* Profile and Notification Icons */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer text-white" />
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="relative">
              <User className="w-6 h-6 cursor-pointer text-white" />
              <span className="absolute top-0 right-0 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>
            {/* Logout Button */}
            <div
              className="flex items-center space-x-3 px-4 py-2 cursor-pointer hover:bg-blue-700 rounded"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 text-white" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>Logout</span>
            </div>
          </div>
        </div>

        {/* Render the active tab content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
