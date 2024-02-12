import { useState } from "react";
import { NavLink } from "react-router-dom";
import InformationIcon from "../icons/InformationIcon";
import useAuth from "../../hooks/useAuth";
import ProfileIcon from "../icons/Profileicon";
import VenueIcon from "../icons/VenueIcon";
import HomeIcon from "../icons/HomeIcon";

function MobileNav() {
  const { isLoggedIn, logOut, user } = useAuth();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 ">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <NavLink
            to={"/"}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <HomeIcon />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
              Home
            </span>
          </NavLink>
          <NavLink
            to="/venues"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <VenueIcon />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
              Venues
            </span>
          </NavLink>
          <NavLink
            to={"/about"}
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <InformationIcon />
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
              About
            </span>
          </NavLink>
          {isLoggedIn ? (
            <div
              onClick={() => setProfileOpen((prev) => !prev)}
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  height={"22px"}
                  width={"22px"}
                  className="mb-2"
                  alt="Profile picture"
                />
              ) : (
                <ProfileIcon className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" />
              )}
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
                {isLoggedIn ? user?.name : "Profile"}
              </span>
            </div>
          ) : (
            <NavLink
              to="login"
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <ProfileIcon className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
                Log in
              </span>
            </NavLink>
          )}
          {profileOpen && (
            <div className="fixed bottom-[62px] right-0 border-x border-t bg-white border-gray-200 text-gray-500 text-sm w-[25%] text-center z-50 ">
              <ul className="flex flex-col gap-5 ">
                <li className="hover:bg-gray-50 py-5  cursor-pointer hover:text-primary">
                  <NavLink
                    to={"/profile"}
                    onClick={() => setProfileOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "underline underline-offset-4 " : ""
                    }
                  >
                    My profile
                  </NavLink>
                </li>

                <li
                  className="cursor-pointer hover:bg-gray-50 py-5 "
                  onClick={() => {
                    setProfileOpen(false);
                    logOut();
                  }}
                >
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNav;
