import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SearchEvent from './Pages/SearchEvent';
import About from './Pages/About/About';
import Contact from './Pages/Contact';
import Layout from './Components/Layout';
import LoginSignup from './Pages/LoginSignup';
import AdminDashboard from './Pages/Landing/AdminDashboard';
import OrganizerDashboard from './Pages/Landing/OrganizerDashboard';
import UserDashboard from './Pages/Landing/UserDashboard'; 

const App = () => {
  return (
    <Router>
      <Layout>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-event" element={<SearchEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loginsignup" element={<LoginSignup />} />
          <Route path="/admindb" element={<AdminDashboard />} />
          <Route path="/orgdb" element={<OrganizerDashboard />} />
          <Route path="/userdb" element={<UserDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;