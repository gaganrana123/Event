import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // Exclude the footer on specific dashboard pages
  if (
    location.pathname.startsWith("/admindb") ||
    location.pathname.startsWith("/orgdb")
  ) {
    return null; // Do not render the footer
  }

  return (
    <div>
      <footer className="bg-gray-800 text-white py-6">
        <div className="px-4 mx-3">CATEGORIES</div>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link to="#" className="mx-5 px-4 hover:text-gray-300">
                  Category 1
                </Link>
              </li>
              <li>
                <Link to="#" className="mx-5 px-4 hover:text-gray-300">
                  Category 2
                </Link>
              </li>
              <li>
                <Link to="#" className="mx-5 px-4 hover:text-gray-300">
                  Category 3
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-1 text-center">
            <p>© 2024 eventA</p>
          </div>

          <div className="flex-1 text-right">
            <p>
              <Link to="#" className="hover:underline">
                Contact Info
              </Link>{" "}
              |{" "}
              <Link to="#" className="hover:underline">
                Terms of Service
              </Link>{" "}
              |{" "}
              <Link to="#" className="hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
