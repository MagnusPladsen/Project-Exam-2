import { NavLink } from "react-router-dom";
import ProfileIcon from "../icons/Profileicon";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import DropDownIcon from "../icons/DropDownIcon";
import { motion } from "framer-motion";

function DesktopNav({ links }: { links: NavLink[] }) {
  const { isLoggedIn, logOut, user } = useAuth();
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
            className="flex gap-2 items-center cursor-pointer"
          >
            <motion.div
              animate={{
                rotate: open ? 180 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <DropDownIcon />
            </motion.div>
            <p>{user?.name}</p>{" "}
            {user?.avatar ? (
              <img
                src={user.avatar}
                height={"34px"}
                width={"34px"}
                alt="Profile picture"
              />
            ) : (
              <ProfileIcon className="!h-[34px] !w-[34px] !text-white" />
            )}
          </div>

          {open && (
            <div className="absolute right-0 top-[60px] bg-primary px-10 py-5 rounded-bl">
              <ul className="flex flex-col gap-4">
                <li>
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) =>
                      isActive ? "underline underline-offset-4" : ""
                    }
                  >
                    My profile
                  </NavLink>
                </li>

                <li className="cursor-pointer" onClick={logOut}>
                  Log out
                </li>
              </ul>
            </div>
          )}
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
