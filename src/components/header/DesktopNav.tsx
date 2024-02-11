import { NavLink } from "react-router-dom";
import ProfileIcon from "../icons/Profileicon";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

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
      <li>
        {isLoggedIn ? (
          <>
            <div
              onClick={() => setOpen((prev) => !prev)}
              className="flex gap-2 items-center cursor-pointer"
            >
              <p>{user?.name}</p>{" "}
              {user?.avatar ? (
                <img src={user.avatar} height={"34px"} width={"34px"} alt="Profile picture" />
              ) : (
                <ProfileIcon />
              )}
            </div>

            {open && (
              <div className="absolute bg-primary rounded">
                <ul className="flex flex-col gap-2">
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
      </li>
    </ul>
  );
}

export default DesktopNav;
