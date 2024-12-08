import { Link } from "react-router-dom";

const CreateEvent = () => {
  return (
    <>
      {/* Header Section */}
      <div className="w-full z-10 bg-blue-800 flex justify-between items-center px-8 py-4 shadow-md mt-20">
        {/* Flex container for dropdowns */}
        <div className="flex items-center space-x-2">
          <div className="text-white font-bold text-lg">Organizer</div>
          <div className="dropdown relative">
            <button
              tabIndex={0}
              className="btn bg-white text-gray-800 px-4 py-2 border rounded-lg flex items-center hover:bg-gray-200 transition"
            >
              Industries
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content bg-white border rounded-md shadow-lg mt-2 w-44 p-2 absolute z-10"
            >
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Entertainment
              </li>
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Education
              </li>
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Sports
              </li>
            </ul>
          </div>

          {/* Event Type Dropdown */}
          <div className="dropdown relative">
            <button
              tabIndex={0}
              className="btn bg-white text-gray-800 px-4 py-2 border rounded-lg flex items-center hover:bg-gray-200 transition"
            >
              Event Type
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content bg-white border rounded-md shadow-lg mt-2 w-44 p-2 absolute z-10"
            >
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Wedding
              </li>
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Conference
              </li>
              <li className="py-1 px-2 hover:bg-gray-200 rounded-md cursor-pointer">
                Festival
              </li>
            </ul>
          </div>
        </div>

        {/* Right-side navigation links */}
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="text-white font-bold text-lg">
            Contact
          </Link>
          <Link
            to="/get-started"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
      
      <br />
      
      {/* Create Event Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create Your Event</h1>
        <p>Start creating your event by filling out the details below...</p>
        
        {/* Event Creation Form */}
        <form className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="eventName" className="block text-gray-700 mb-2">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the event name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="eventDate" className="block text-gray-700 mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="eventTime" className="block text-gray-700 mb-2">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="eventLocation" className="block text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="eventLocation"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter the event location"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eventDescription" className="block text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="eventDescription"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              rows="4"
              placeholder="Enter a brief description of the event"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="eventImage" className="block text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="eventImage"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Event
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
