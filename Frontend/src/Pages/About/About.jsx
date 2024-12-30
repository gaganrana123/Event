import React from 'react';
import { Calendar, Users, MapPin, Trophy, Check, ArrowRight } from 'lucide-react';

const About = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'eVENTA was established with a vision to transform event management.'
    },
    {
      year: '2021',
      title: 'Rapid Growth',
      description: 'Expanded to serve over 5,000 users and 100+ events monthly.'
    },
    {
      year: '2022',
      title: 'Platform Evolution',
      description: 'Launched advanced features including virtual events and AI-powered recommendations.'
    },
    {
      year: '2023',
      title: 'Global Reach',
      description: 'Extended services to multiple countries, serving diverse event needs.'
    }
  ];

  const benefits = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      title: "Streamlined Planning",
      description: "Intuitive tools for seamless event organization"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Community Focus",
      description: "Connect with like-minded event enthusiasts"
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Location Services",
      description: "Find perfect venues with advanced location features"
    },
    {
      icon: <Trophy className="w-8 h-8 text-blue-500" />,
      title: "Premium Features",
      description: "Access exclusive tools and analytics"
    }
  ];

  // Stats component embedded directly
  const Stats = () => {
    return (
      <div className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-12">eVENTA Platform Stats</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-blue-800 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Wedding Vendors</h3>
            <p className="text-4xl animate-pulse">50+</p>
          </div>

          <div className="bg-blue-300 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Wedding Venues</h3>
            <p className="text-4xl animate-pulse">500+</p>
          </div>
    
          <div className="bg-green-600 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Users</h3>
            <p className="text-4xl animate-pulse">10,000+</p>
          </div>
    
          <div className="bg-red-600 text-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <h3 className="text-2xl font-bold mb-2">Events</h3>
            <p className="text-4xl animate-pulse">1,200+</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center leading-tight mb-6">
            About eVENTA
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mb-8">
            Transforming the way people connect through memorable events
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Welcome to eVENTA, your one-stop platform for hosting and attending events. 
            We make the process seamless and fun, providing cutting-edge tools for browsing events, 
            booking tickets, and hosting your own, with full customization options.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <Stats />

      {/* Vision Cards Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To revolutionize the event industry by making planning and attendance simple, 
              efficient, and cost-effective while creating unforgettable experiences.
            </p>
          </div>

          {/* Values Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Values</h2>
            <ul className="space-y-3">
              {['Innovation', 'Customer-centricity', 'Sustainability'].map((value) => (
                <li key={value} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">{value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Team Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Team</h2>
            <p className="text-gray-600">
              Our experienced team delivers exceptional service with attention to detail 
              and personalized care, ensuring every event's success.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8">
                <div className="w-24 pt-2">
                  <span className="text-blue-600 font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-blue-200 pl-8 relative">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-2"></div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose eVENTA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Create Your Event?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful event organizers on eVENTA
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
            Get Started Now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;