import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { debounce } from 'lodash';
import api from '../utils/api';

const SearchEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    priceRange: '',
    date: '',
    status: ''
  });
  const [activeFilters, setActiveFilters] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Predefined options for filters
  const categories = ['Conference', 'Workshop', 'Seminar', 'Concert', 'Sports', 'Other'];
  const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];
  const priceRanges = ['Free', '$1-$50', '$51-$100', '$100+'];

  const debouncedFetch = useCallback(
    debounce(async (filterParams) => {
      setLoading(true);
      try {
        // Using the api utility with the correct endpoint
        const response = await api.get('/events', { 
          params: filterParams
        });
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    const activeFilterCount = Object.values(filters).filter(Boolean).length;
    setActiveFilters(activeFilterCount);
    debouncedFetch(filters);
    return () => debouncedFetch.cancel();
  }, [filters, debouncedFetch]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      priceRange: '',
      date: '',
      status: ''
    });
  };

  const FilterButton = () => (
    <button
      onClick={() => setShowFilters(!showFilters)}
      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
    >
      <Filter className="w-4 h-4" />
      <span>Filters</span>
      {activeFilters > 0 && (
        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
          {activeFilters}
        </span>
      )}
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Events</h1>

        {/* Main Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          />
        </div>

        {/* Filter Section */}
        <div className="flex justify-center gap-4 mb-4">
          <FilterButton />
          {activeFilters > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="max-w-4xl mx-auto mt-4 p-4 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Enter location"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Prices</option>
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-8">
          <p>{error}</p>
        </div>
      )}

      {/* Events Display */}
      {!loading && !error && (
        <>
          <p className="text-gray-600 mb-4">
            {events.length} {events.length === 1 ? 'event' : 'events'} found
          </p>
          
          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-purple-500 hover:text-purple-600"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.event_name}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                        event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2">{event.event_name}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Date:</span>
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        {event.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Price:</span>
                        ${event.price}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Available Slots:</span>
                        {event.totalSlots - (event.attendees?.length || 0)}
                      </p>
                    </div>

                    <button className="w-full mt-4 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchEvent;