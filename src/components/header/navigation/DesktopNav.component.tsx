import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useGetPath from "../../../hooks/useGetPath";
import { NavigationLink } from "../../../types/types";
import DropDownIcon from "../../icons/DropDownIcon.component";
import ProfileIcon from "../../icons/Profileicon.component";

function DesktopNav({ links }: { links: NavigationLink[] }) {
  const { isLoggedIn, logOut, user } = useAuth();
  const { isOnProfileRoute } = useGetPath();

  const [open, setOpen] = useState(false);

  return (
    <ul className="lg:flex gap-5 hidden items-center">
      {links.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : ""
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}

      {isLoggedIn ? (
        <>
          <div
            onClick={() => setOpen((prev) => !prev)}
            className={`${
              isOnProfileRoute && "underline underline-offset-4"
            } flex gap-2 items-center cursor-pointer justify-center ml-2`}
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                className="rounded-full object-cover h-[34px] w-[34px]"
                alt="Profile picture"
              />
            ) : (
              <ProfileIcon className="!h-[34px] !w-[34px] !text-white" />
            )}
            <p>{user?.name}</p>
            <motion.div
              animate={{
                rotate: open ? 0 : 90,
              }}
              transition={{ duration: 0.2 }}
            >
              <DropDownIcon className="text-white !h-3 !w-3" />
            </motion.div>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 top-[80px] shadow-md bg-primary px-10 pb-5 rounded-bl"
              >
                <ul className="flex flex-col gap-4">
                  <li>
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={`/profile/${user!.name}`}
                      className={"hover:underline underline-offset-2"}
                    >
                      My profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={`/profile/${user!.name}/bookings`}
                      className={"hover:underline underline-offset-2"}
                    >
                      My bookings
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      onClick={() => setOpen(false)}
                      to={`/profile/${user!.name}/venues`}
                      className={"hover:underline underline-offset-2"}
                    >
                      My venues
                    </NavLink>
                  </li>

                  <li
                    onClick={() => {
                      setOpen(false);
                      logOut();
                    }}
                    className={"hover:underline underline-offset-2"}
                  >
                    Log out
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : ""
            }
          >
            Log in
          </NavLink>
        </li>
      )}
    </ul>
  );
}

export default DesktopNav;
