import { useState } from "react";
import { NavLink } from "react-router-dom";
import InformationIcon from "../icons/InformationIcon";
import useAuth from "../../hooks/useAuth";
import ProfileIcon from "../icons/Profileicon";

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
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500">
              Home
            </span>
          </NavLink>
          <NavLink
            to="/venues"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
              <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
            </svg>
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
