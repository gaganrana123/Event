import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import PublicEvent from './Pages/PublicEvent';
import About from './Pages/About/About';
import Contact from './Pages/Contact';
import LoginSignup from './Pages/LoginSignup';
import AdminDashboard from './Pages/Landing/AdminDashboard';
import OrganizerDashboard from './Pages/Landing/OrganizerDashboard';
import UserDashboard from './Pages/Landing/UserDashboard';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/event" element={<PublicEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loginsignup" element={<LoginSignup />} />

          {/* Protected Routes */}
          <Route 
            path="/admindb" 
            element={<PrivateRoute element={AdminDashboard} requiredRole="Admin" />} 
          />
          <Route 
            path="/orgdb" 
            element={<PrivateRoute element={OrganizerDashboard} requiredRole="Organizer" />} 
          />
          <Route 
            path="/userdb" 
            element={<PrivateRoute element={UserDashboard} requiredRole="User" />} 
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;