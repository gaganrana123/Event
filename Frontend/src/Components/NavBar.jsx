import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import eventA from "../assets/images/eventA.png";
import SearchIcon from "../assets/icon/SearchIcon.png";

const NavBar = () => {
  const [sticky, setSticky] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/search-event">Event</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link
          to="/loginsignup"
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 active:bg-green-500 focus:bg-green-500 visited:bg-green-500 transition-colors"
        >
          Login
        </Link>
      </li>
    </>
  );

  if (
    location.pathname.startsWith("/admindb") ||
    location.pathname.startsWith("/orgdb")
  ) {
    return null;
  }

  return (
    <>
      <div>
        <div
          className={`max-w-screen-2xl container mx-auto md:px-50 px-4 fixed top-0 left-0 right-0 z-50 ${
            sticky
              ? "sticky-navbar shadow-md bg-base-200 duration-100 transition-all ease-in-out"
              : ""
          }`}
        >
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow flex justify-between"
                >
                  {navItems}
                </ul>
              </div>

              <Link to="/" className="navbar-center flex justify-start">
                <img src={eventA} alt="logo" height={100} width={100} />
              </Link>

              <div className="flex items-center bg-white border rounded-md shadow-sm px-4 py-2 w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="Search events"
                  className="flex-grow focus:outline-none focus:ring-0 border-none px-2"
                />
                <span className="mx-2 text-gray-400">|</span>
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-grow focus:outline-none focus:ring-0 border-none px-2"
                />
                <button className="ml-4 p-1 rounded-full bg-white focus:outline-none">
                  <img src={SearchIcon} alt="Search" className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="navbar-end space-x-3">
              <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />
    </>
  );
};

export default NavBar;
