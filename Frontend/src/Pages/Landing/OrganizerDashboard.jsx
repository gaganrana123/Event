import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Trash2, Edit, Eye, Calendar, Users, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { useSidebar } from "../../context/SidebarContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import api, { getUserFromToken } from "../../utils/api";
import { getToken } from "../../utils/auth";

const OrganizerDashboard = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("");
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  // Custom Card Components
const Card = ({ children, className = "" }) => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex items-center justify-between mb-2 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-sm font-medium ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

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
      if (activeTab === "My Events" || activeTab === "Overview") {
        try {
          setLoading(true);
          setError("");
  
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
  
          const eventsResponse = await api.get(`/events/user/${userData._id}`);
          const userEvents = eventsResponse.data;
          
          setEvents(userEvents);

          // Calculate stats for Overview
          if (activeTab === "Overview") {
            const totalEvents = userEvents.length;
            const upcomingEvents = userEvents.filter(e => new Date(e.event_date) > new Date()).length;
            const totalAttendees = userEvents.reduce((sum, event) => sum + (event.attendees?.length || 0), 0);
            const totalRevenue = userEvents.reduce((sum, event) => 
              sum + (event.price * (event.attendees?.length || 0)), 0);

            setStats({
              totalEvents,
              upcomingEvents,
              totalAttendees,
              totalRevenue,
            });

            // Prepare chart data
            const chartData = userEvents
              .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
              .map(event => ({
                name: format(new Date(event.event_date), 'MMM d'),
                attendees: event.attendees?.length || 0,
                revenue: event.price * (event.attendees?.length || 0),
                capacity: event.totalSlots,
              }));

            setChartData(chartData);
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
    <form 
      className={`${
        isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
      } p-6 rounded-lg shadow space-y-6`} 
      onSubmit={handleCreateEvent}
    >
      {error && <div className="text-red-500 p-3 rounded bg-red-50">{error}</div>}

      <div>
        <h3 className="text-lg font-semibold mb-2">Event Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input 
              name="event_name" 
              type="text" 
              className={`w-full p-2 border rounded ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
              }`}
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              name="category" 
              className={`w-full p-2 border rounded ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
              }`}
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
            className={`w-full p-2 border rounded ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-white border-gray-300'
            }`}
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
        <div key={event._id} className={`${
          isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white'
        } rounded-lg shadow-md overflow-hidden`}>
          <img 
            src={event.image || "/default-event.jpg"} 
            alt={event.event_name}
            className="w-full h-48 object-cover"
          />
          
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{event.event_name}</h3>
            <p className={`${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            } mb-2 line-clamp-2`}>
              {event.description}
            </p>
            
            <div className={`space-y-2 text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <p>Date: {format(new Date(event.event_date), 'PPP')}</p>
              <p>Location: {event.location}</p>
              <p>Price: ${event.price}</p>
              <p>Slots: {event.attendees?.length || 0}/{event.totalSlots}</p>
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                onClick={() => window.location.href = `/event/${event._id}`}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={() => window.location.href = `/event/edit/${event._id}`}
                className="p-2 text-green-500 hover:bg-green-50 rounded"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDeleteEvent(event._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
                disabled={event.status !== 'upcoming'}
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {events.length === 0 && (
        <div className={`col-span-full text-center py-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          No events found. Create your first event to get started!
        </div>
      )}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-sm text-gray-500">{stats.upcomingEvents} upcoming</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Attendees</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAttendees}</div>
            <p className="text-sm text-gray-500">Across all events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-gray-500">All time earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Event</CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {chartData.length > 0 ? chartData[0].name : "No events"}
            </div>
            <p className="text-sm text-gray-500">Upcoming event date</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attendees" fill="#3b82f6" name="Attendees" />
                <Bar dataKey="capacity" fill="#93c5fd" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  name="Revenue"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) return <div className="flex justify-center p-8">Loading...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    switch (activeTab) {
      case "Overview":
        return renderOverview();
      case "Create Event":
        return renderCreateEventForm();
      case "My Events":
        return renderMyEvents();
      default:
        return <div>{activeTab} content goes here.</div>;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'
    } ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">{activeTab}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default OrganizerDashboard;