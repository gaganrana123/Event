import React, { useState } from 'react';

const SportsEventListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Football');

  const categories = ['Football', 'Basketball', 'Tennis', 'Cricket'];
  const events = [
    // Football Events
    {
      category: 'Football',
      title: 'Champions League Final',
      date: '2024-12-21',
      time: '6:00 PM',
      location: 'Stadium A, City Center',
      description: 'The grand finale of the Champions League.',
      image: 'https://play-lh.googleusercontent.com/mrjcLx29YdA8FE29vfkX4GOWrKKvEVM_PUJydLiFKpq_bmYV9Cric5T77skgaIN9PLA',
    },
    {
      category: 'Football',
      title: 'World Cup Final',
      date: '2024-12-18',
      time: '7:00 PM',
      location: 'National Stadium',
      description: 'The final match of the FIFA World Cup.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNF61c-DIIO3jvgK_Bz6LzAyWP18F9awYq4Q&s',
    },
    
    
    {
      category: 'Football',
      title: 'Premier League Match',
      date: '2024-12-24',
      time: '3:00 PM',
      location: 'Old Trafford, Manchester',
      description: 'A thrilling match in the Premier League.',
      image: 'https://ntvb.tmsimg.com/assets/p3605402_b_h8_ar.jpg?w=1280&h=720',
    },
    // Basketball Events
    {
      category: 'Basketball',
      title: 'NBA All-Star Game',
      date: '2024-12-23',
      time: '8:00 PM',
      location: 'Arena 1, Downtown',
      description: 'Watch the best basketball players compete in this all-star event.',
      image: 'https://hoopshype.com/wp-content/uploads/sites/92/2024/08/78_best_nba2.png?w=640',
    },
    {
      category: 'Basketball',
      title: 'NBA Finals Game 1',
      date: '2024-12-24',
      time: '9:00 PM',
      location: 'Staples Center, Los Angeles',
      description: 'The first game of the NBA Finals.',
      image: 'https://c0.wallpaperflare.com/preview/823/100/961/stadium-people-crowd-person.jpg',
    },
    // Tennis Events
    {
      category: 'Tennis',
      title: 'Wimbledon Finals',
      date: '2024-12-26',
      time: '4:00 PM',
      location: 'Wimbledon Stadium, London',
      description: 'Catch the action as top tennis players compete for the trophy.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQufKLMvtpwQYJTWVcr5_xqfGdnU09qFIiHude3NU3GJE0T7dUaQp4OUG8_bfwwqbsMprI&usqp=CAU',
    },
    {
      category: 'Tennis',
      title: 'US Open Final',
      date: '2024-12-28',
      time: '2:00 PM',
      location: 'Flushing Meadows, New York',
      description: 'The grand finale of the US Open tennis tournament.',
      image: 'https://static01.nyt.com/images/2024/07/30/multimedia/00xp-usopenguide-hjlb/00xp-usopenguide-hjlb-videoSixteenByNineJumbo1600.jpg',
    },
    // Cricket Events
    {
      category: 'Cricket',
      title: 'IPL Final 2024',
      date: '2024-12-28',
      time: '7:00 PM',
      location: 'Cricket Stadium, National Park',
      description: 'The exciting final match of the Indian Premier League.',
      image: 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/378200/378278.6.jpg',
    },
    {
      category: 'Cricket',
      title: 'ICC World Cup Final',
      date: '2024-12-29',
      time: '6:00 PM',
      location: 'Melbourne Cricket Ground, Melbourne',
      description: 'The final of the ICC Cricket World Cup.',
      image: 'https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/wmsrfzdcgcspu8grtusk',
    },
  ];

  const filteredEvents = events.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 pt-[80px]">
      <main className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-600">Sports Events</h1>
          <p className="text-gray-700 text-lg">Discover and explore a variety of sports events you can attend.</p>
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

export default SportsEventListPage;
