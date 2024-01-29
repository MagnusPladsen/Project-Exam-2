import { NavLink } from "react-router-dom";
import ProfileIcon from "../icons/Profileicon";

function DesktopNav({ links }: { links: NavLink[] }) {
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
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            isActive ? "underline underline-offset-4" : ""
          }
        >
          <div className="flex gap-2 items-center">
            <p>My profile</p> <ProfileIcon />
          </div>
        </NavLink>
      </li>
    </ul>
  );
}

export default DesktopNav;
