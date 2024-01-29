import { NavLink } from "react-router-dom";

function DesktopNav({ links }: { links: NavLink[] }) {
  return (
    <ul className="lg:flex gap-10 hidden">
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
    </ul>
  );
}

export default DesktopNav;
