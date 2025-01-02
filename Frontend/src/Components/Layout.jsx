import PropTypes from "prop-types";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { ThemeProvider } from '../context/ThemeContext';

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
