import React from 'react';
import Stats from './Stats'; // Ensure the path is correct

// Import images correctly using React's import system
import OurMission from '../../assets/images/OurMission.png';
import OurValues from '../../assets/images/OurValue.png';
import OurTeam from '../../assets/images/OurTeam.png';

const About = () => {
  return (
    <>
      <div className="w-full z-10 bg-blue-800 flex justify-center items-center text-4xl
                text-white font-extrabold py-4 shadow-md mt-20">
        About Us                    
      </div>            
      <br/>
      <div className="container mx-auto py-24">
        <p className="text-lg mb-8">
          Welcome to eVENTA, your one-stop platform for hosting and attending events. We make the process seamless and fun.
        </p>

        <p className="text-lg mb-8">
          At eVENTA, we provide tools for browsing events, booking tickets, and hosting your own, with full customization options.
        </p>

        <Stats />

        <div className="flex flex-wrap justify-center mb-12">
            {/* First Card */}
            <div className="w-full md:w-1/3 p-6 relative group">
                <div className="relative flex items-center overflow-hidden h-60"> {/* Set a fixed height */}
                  <img 
                      src={OurMission} 
                      alt="Our Mission" 
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:-translate-x-10"  // Image slides to the left
                  />
                  <div className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out ml-4 h-full flex items-center"> {/* Full height and center text */}
                    <div className="bg-white p-4 rounded shadow-lg">
                      <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                      <p className="text-lg">
                        To revolutionize the event industry by making planning and attendance simple, efficient, and cost-effective.
                      </p>
                    </div>
                  </div>
                </div>
            </div>

            {/* Second Card */}
            <div className="w-full md:w-1/3 p-6 relative group">
                <div className="relative flex items-center overflow-hidden h-60"> {/* Set same fixed height */}
                  <img 
                      src={OurValues}   
                      alt="Our Values" 
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:-translate-x-10"  // Image slides to the left
                  />
                  <div className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out ml-4 h-full flex items-center"> {/* Full height and center text */}
                    <div className="bg-white p-4 rounded shadow-lg">
                      <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                      <ul className="list-disc pl-4">
                        <li>Innovation: Embracing the latest technologies to improve our platform.</li>
                        <li>Customer-centricity: Prioritizing user needs.</li>
                        <li>Sustainability: Promoting eco-friendly and sustainable practices.</li>
                      </ul>
                    </div>
                  </div>
                </div>
            </div>

            {/* Third Card */}
            <div className="w-full md:w-1/3 p-6 relative group">
                <div className="relative flex items-center overflow-hidden h-60"> {/* Set same fixed height */}
                  <img 
                      src={OurTeam}  
                      alt="Our Team" 
                      className="w-full h-full object-cover rounded-lg transition-transform duration-300 ease-in-out transform group-hover:-translate-x-10"  // Image slides to the left
                  />
                  <div className="absolute right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out ml-4 h-full flex items-center"> {/* Full height and center text */}
                    <div className="bg-white p-4 rounded shadow-lg">
                      <h2 className="text-2xl font-bold mb-4">Our Team</h2>
                      <p className="text-lg">
                        Our experienced team delivers exceptional service with attention to detail and personalized care.
                      </p>
                    </div>
                  </div>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">What You Can Do with eVENTA</h2>
        <ul className="list-disc pl-8 mb-8">
          <li>Discover events.</li>
          <li>Customize your gatherings.</li>
          <li>Manage ticket sales.</li>
          <li>Pay with QR codes or debit cards.</li>
          <li>Share events on social media.</li>
        </ul>

        <p className="text-lg mb-8">
          Whether hosting or attending, eVENTA ensures a seamless event experience from start to finish.
        </p>
        
      </div>
    </>
  );
};

export default About;
