import React, { useState } from 'react';

const EventListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Workshops');

  const categories = ['Workshops', 'Seminars', 'Webinars', 'Conferences'];
  const events = [
    {
      category: 'Workshops',
      title: 'React Basics Workshop',
      date: '2024-12-20',
      time: '10:00 AM',
      location: 'Online',
      description: 'Learn the basics of React.js in this hands-on workshop.',
      image: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*RDN058L5gQ02Xy13OaxjnQ.jpeg', // Replace with actual image
    },
    {
      category: 'Seminars',
      title: 'AI in Education Seminar',
      date: '2024-12-22',
      time: '2:00 PM',
      location: 'Hall B, City Center',
      description: 'Explore the role of AI in transforming education.',
      image: 'https://tltlab.org/wp-content/uploads/2019/09/AI-181-1100x733.jpg', // Replace with actual image
    },
    {
      category: 'Webinars',
      title: 'Effective Online Teaching Strategies',
      date: '2024-12-25',
      time: '5:00 PM',
      location: 'Online',
      description: 'Tips and tricks for engaging online classes.',
      image: 'https://www.instamojo.com/blog/wp-content/uploads/2020/05/webinar-bi-2.jpg', // Replace with actual image
    },
    {
      category: 'Conferences',
      title: 'EdTech 2024 Conference',
      date: '2024-12-30',
      time: '9:00 AM',
      location: 'Convention Center',
      description: 'Annual conference focusing on educational technology trends.',
      image: 'https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg', // Replace with actual image
    },
  ];

  const filteredEvents = events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 pt-[80px]">
      <main className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Educational Events</h1>
          <p className="text-gray-700 text-lg">Discover and explore a variety of educational events tailored to your interests.</p>
        </div>

        <div className="flex justify-center mb-8">
          {categories.map(category => (
            <button
              key={category}
              className={`mx-2 px-6 py-2 rounded-full text-sm font-semibold shadow-lg ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              } hover:bg-blue-100 hover:shadow-xl transition-all`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105">
              <img
                src={event.image} // Image source
                alt={event.title} // Alt text for accessibility
                className="w-full h-40 object-cover rounded-lg mb-4" // Styling the image
              />
              <h2 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-semibold">Date:</span> {event.date} | <span className="font-semibold">Time:</span> {event.time}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventListPage;
