import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Calendar, Users, MapPin, Trophy, Star, ArrowRight } from 'lucide-react';

const Home = () => {
  const features = [
    { 
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      title: "Easy Event Creation",
      description: "Create and manage events effortlessly with our intuitive interface"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community Building",
      description: "Connect with like-minded people and build your community"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Location Services",
      description: "Find events near you with advanced location filtering"
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-500" />,
      title: "Premium Features",
      description: "Access exclusive features and premium event content"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      content: "eventA has transformed how I manage my events. The platform is intuitive and powerful.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Regular Attendee",
      content: "I've discovered amazing events and met wonderful people through this platform.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Community Leader",
      content: "The best platform for creating and managing community events. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6">
            Create Memorable Events<br />with eventA
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mb-8">
            Your all-in-one platform for discovering, creating, and managing events that bring people together
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose eventA?</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover the features that make eventA the perfect platform for your event management needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found success with eventA
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community and start creating unforgettable events today
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Create Your Event <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;