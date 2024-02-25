import { Link, NavLink } from "react-router-dom";
import Logo from "../logo/Logo.component";
import useAuth from "../../hooks/useAuth";

function Footer() {
  const { isLoggedIn, user } = useAuth();

  const linkStyles = "hover:underline me-4 md:me-6";
  return (
    <footer className="bg-primary mt-10 hidden lg:block">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="https://holidaze.pladsen.dev/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? `underline underline-offset-4 ${linkStyles}`
                    : linkStyles
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/venues"
                className={({ isActive }) =>
                  isActive
                    ? `underline underline-offset-4 ${linkStyles}`
                    : linkStyles
                }
              >
                Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `underline underline-offset-4 ${linkStyles}`
                    : linkStyles
                }
              >
                About
              </NavLink>
            </li>
            {!isLoggedIn ? (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? "underline underline-offset-4" : ""
                  }
                >
                  Log in
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  to={`/profile/${user?.name}`}
                  className={({ isActive }) =>
                    isActive ? "underline underline-offset-4" : ""
                  }
                >
                  My profile
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">
          © 2023{" "}
          <Link to="https://holidaze.pladsen.dev/" className="hover:underline">
            Holidaze™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
