import { useState } from "react";
import HamburgerIcon from "../icons/hamburger/HamburgerIcon";
import { NavLink } from "react-router-dom";

function MobileNav({
  links,
  mobileHeaderHeight,
}: {
  links: NavLink[];
  mobileHeaderHeight: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <div
        style={{ height: mobileHeaderHeight }}
        onClick={() => setOpen((prev) => !prev)}
        className={`absolute right-4 flex top-0 items-center`}
      >
        <HamburgerIcon />
      </div>
      {open && (
        <div
          style={{
            top: mobileHeaderHeight,
            right: 0,
            height: `calc(100vh - ${mobileHeaderHeight})`,
          }}
          className={`absolute bg-primary w-screen `}
        >
          <ul className="flex flex-col items-center justify-center gap-10 h-full w-full">
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
        </div>
      )}
    </div>
  );
}

export default MobileNav;
