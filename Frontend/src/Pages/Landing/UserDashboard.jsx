import React, { useState } from 'react';
import { 
  Calendar,
  Users, 
  TrendingUp, 
  Heart, 
  Star, 
  MapPin, 
  Share2,
  Clock 
} from 'lucide-react';

const UserDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);

  const themeClasses = {
    layout: isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-white',
    text: isDarkMode ? 'text-gray-100' : 'text-gray-800',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-gray-200',
    button: isDarkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-purple-500 hover:bg-purple-600'
  };

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'featured', name: 'Featured', icon: Star }
  ];

  const events = [
    {
      id: 1,
      name: 'Tech Innovation Summit 2024',
      date: '2024-12-25',
      time: '09:00 AM',
      attendees: 120,
      category: 'trending',
      image: '/api/placeholder/600/400',
      location: 'Silicon Valley',
      price: '$299'
    },
    {
      id: 2,
      name: 'Creative Design Workshop',
      date: '2024-12-28',
      time: '10:30 AM',
      attendees: 45,
      category: 'featured',
      image: '/api/placeholder/600/400',
      location: 'New York City',
      price: '$149'
    },
    {
      id: 3,
      name: 'Future of AI Conference',
      date: '2025-01-05',
      time: '11:00 AM',
      attendees: 200,
      category: 'trending',
      image: '/api/placeholder/600/400',
      location: 'London',
      price: '$399'
    }
  ];

  const filteredEvents = selectedCategory === 'all' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  return (
    <div className={`min-h-screen ${themeClasses.layout}`}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Categories */}
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? `${themeClasses.button} text-white`
                    : `${themeClasses.card} ${themeClasses.text}`
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEvents.map(event => (
            <div
              key={event.id}
              className={`${themeClasses.card} rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer`}
              onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40">
                    <Share2 className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                    {event.price}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className={`h-4 w-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textMuted}`}>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className={`h-4 w-4 ${themeClasses.textMuted}`} />
                    <span className={`text-sm ${themeClasses.textMuted}`}>{event.attendees}</span>
                  </div>
                </div>
                <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>{event.name}</h3>
                <div className="flex items-center space-x-2">
                  <MapPin className={`h-4 w-4 ${themeClasses.textMuted}`} />
                  <span className={`text-sm ${themeClasses.textMuted}`}>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;