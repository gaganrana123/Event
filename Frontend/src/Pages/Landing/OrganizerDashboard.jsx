import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Trash2, Edit, Eye } from "lucide-react";
import { format } from "date-fns";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import api, { getUserFromToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const OrganizerDashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      if (activeTab === "My Events") {
        try {
          setLoading(true);
          setError("");
  
          // Get token and decode it to get user email
          const token = getToken();
          if (!token) {
            throw new Error("No authentication token found");
          }
  
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          if (!decodedToken.user?.email) {
            throw new Error("Unable to verify user email");
          }
  
          // Get user data using email
          const userResponse = await api.get(`/users/email/${decodedToken.user.email}`);
          const userData = userResponse.data.user;
              
          if (!userData || !userData._id) {
            throw new Error("Unable to verify user credentials");
          }
  
          // Fetch events using the retrieved user ID
          const eventsResponse = await api.get(`/events/user/${userData._id}`);
          
          // Handle the response
          if (eventsResponse.data) {
            setEvents(eventsResponse.data);
          } else {
            setEvents([]);
          }
  
        } catch (err) {
          console.error("Error fetching events:", err);
          let errorMessage = "Failed to fetch events";
          
          if (err.response?.data?.message) {
            errorMessage = err.response.data.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchEvents();
  }, [activeTab]);

  useEffect(() => {
    const formatTabName = (tabName) => {
      if (!tabName) return "Overview";
      return tabName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    setActiveTab(formatTabName(tab));
  }, [tab]);

  const handleCreateEvent = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const form = event.target;
      const eventDate = new Date(form.event_date.value);
      const registrationDeadline = new Date(form.registrationDeadline.value);
      const currentDate = new Date();
      const categoryId = form.category.value;

      if (!categoryId) {
        throw new Error("Please select a valid category");
      }

      if (registrationDeadline >= eventDate) {
        throw new Error("Registration deadline must be before event date");
      }
    
      if (eventDate <= currentDate) {
        throw new Error("Event date must be in the future");
      }

      const token = getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (!decodedToken.user?.email) {
        throw new Error("Unable to verify user email");
      }

      const userResponse = await api.get(`/users/email/${decodedToken.user.email}`);
      const userData = userResponse.data.user;
        
      if (!userData || !userData._id) {
        throw new Error("Unable to verify user credentials");
      }

      const eventData = {
        event_name: form.event_name.value.trim(),
        description: form.description.value.trim(),
        event_date: form.event_date.value,
        registrationDeadline: form.registrationDeadline.value,
        time: form.time.value,
        location: form.location.value.trim(),
        price: Number(form.price.value),
        category: categoryId,
        image: 'default-event.jpg',
        totalSlots: Number(form.totalSlots.value),
        status: 'upcoming',
        org_ID: userData._id,
        isPublic: form.isPublic.checked,
        tags: form.tags.value ? form.tags.value.split(",").map(tag => tag.trim()) : []
      };

      const response = await api.post("/events/create", eventData);
      
      if (response.data) {
        navigate("/orgdb/my-events");
      }
    } catch (err) {
      console.error("Error details:", err);
      let errorMessage = "Failed to create event";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      await api.delete(`/events/delete/${eventId}`);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      setError("Failed to delete event");
      console.error(err);
    }
  };

  const renderCreateEventForm = () => (
    <form className="bg-white p-6 rounded-lg shadow space-y-6" onSubmit={handleCreateEvent}>
      {error && <div className="text-red-500 p-3 rounded bg-red-50">{error}</div>}

      <div>
        <h3 className="text-lg font-semibold mb-2">Event Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input 
              name="event_name" 
              type="text" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              name="category" 
              className="w-full p-2 border rounded" 
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input 
              name="event_date" 
              type="date" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Registration Deadline</label>
            <input 
              name="registrationDeadline" 
              type="date" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time</label>
            <input 
              name="time" 
              type="time" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input 
              name="location" 
              type="text" 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input 
              name="price" 
              type="number" 
              className="w-full p-2 border rounded" 
              required 
              min="0" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Slots</label>
            <input 
              name="totalSlots" 
              type="number" 
              className="w-full p-2 border rounded" 
              required 
              min="1" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <input 
              name="tags" 
              type="text" 
              placeholder="Separate tags with commas" 
              className="w-full p-2 border rounded" 
            />
          </div>

          <div className="flex items-center pt-6">
            <input 
              name="isPublic" 
              type="checkbox" 
              className="mr-2" 
            />
            <label>Make Event Public</label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        disabled={loading}
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );

  const renderMyEvents = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={event.image || "/default-event.jpg"} 
            alt={event.event_name}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{event.event_name}</h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{event.description}</p>
            
            <div className="space-y-2 text-sm text-gray-500">
              <p>Date: {format(new Date(event.event_date), 'PPP')}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price}</p>
              <p>Status: <span className={`capitalize px-2 py-1 rounded ${
                event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                'bg-red-100 text-red-800'
              }`}>{event.status}</span></p>
              <p>Slots: {event.attendees?.length || 0}/{event.totalSlots}</p>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => window.location.href = `/event/${event._id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={() => window.location.href = `/event/edit/${event._id}`}
                className="p-2 text-green-600 hover:bg-green-50 rounded"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDeleteEvent(event._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
                disabled={event.status !== 'upcoming'}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {events.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No events found. Create your first event to get started!
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    switch (activeTab) {
      case "Create Event":
        return renderCreateEventForm();
      case "My Events":
        return renderMyEvents();
      default:
        return <div>{activeTab} content goes here.</div>;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{activeTab}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizerDashboard;