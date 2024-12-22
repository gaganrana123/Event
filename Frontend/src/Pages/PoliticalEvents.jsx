import React, { useState } from 'react';

const PoliticalEventListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Elections');

  const categories = ['Elections', 'Rallies', 'Debates', 'Campaigns'];
  const events = [
    // Elections Events
    {
      category: 'Elections',
      title: 'Presidential Election 2024',
      date: '2024-11-05',
      time: '9:00 AM',
      location: 'Nationwide',
      description: 'The presidential election to determine the next leader.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Presidential_election_image.jpg',
    },
    {
      category: 'Elections',
      title: 'Senate Elections 2024',
      date: '2024-11-07',
      time: '8:00 AM',
      location: 'Various Locations',
      description: 'Senate elections across the country.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Voting_station_image.jpg',
    },

    // Rallies Events
    {
      category: 'Rallies',
      title: 'National Unity Rally',
      date: '2024-12-10',
      time: '5:00 PM',
      location: 'Freedom Square, Capital City',
      description: 'A rally promoting national unity and peace.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Rally_image.jpg',
    },
    {
      category: 'Rallies',
      title: 'Climate Action Rally',
      date: '2024-12-15',
      time: '3:00 PM',
      location: 'Green Park, Metro City',
      description: 'A rally advocating for climate action and sustainability.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Climate_rally_image.jpg',
    },

    // Debates Events
    {
      category: 'Debates',
      title: 'Presidential Debate',
      date: '2024-10-20',
      time: '7:00 PM',
      location: 'City Hall, Downtown',
      description: 'Presidential candidates face off in a live debate.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Debate_stage_image.jpg',
    },
    {
      category: 'Debates',
      title: 'Economic Policy Debate',
      date: '2024-10-25',
      time: '6:00 PM',
      location: 'University Auditorium',
      description: 'Experts and politicians debate economic policies.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Economic_debate_image.jpg',
    },

    // Campaigns Events
    {
      category: 'Campaigns',
      title: 'Youth Engagement Campaign',
      date: '2024-09-15',
      time: '4:00 PM',
      location: 'Community Center, Uptown',
      description: 'A campaign focusing on engaging young voters.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Youth_campaign_image.jpg',
    },
    {
      category: 'Campaigns',
      title: 'Healthcare Awareness Campaign',
      date: '2024-09-20',
      time: '10:00 AM',
      location: 'Public Library, Main Street',
      description: 'Raising awareness about healthcare policies.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Healthcare_campaign_image.jpg',
    },
  ];

  const filteredEvents = events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 pt-[80px]">
      <main className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Political Events</h1>
          <p className="text-gray-700 text-lg">Stay informed about upcoming political events in your area.</p>
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
                Learn More
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PoliticalEventListPage;
