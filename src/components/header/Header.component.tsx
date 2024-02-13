import { Link } from "react-router-dom";
import Logo from "../logo/Logo.component";
import DesktopNav from "./navigation/DesktopNav.component";
import MobileNav from "./navigation/MobileNav.component";

const headerHeight = "60px";

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Venues", path: "/venues" },
];
function Header() {
  return (
    <header>
      <nav
        // style bevause of tailwindcss not working properly with variables sometimes
        style={{ height: headerHeight }}
        className={` bg-primary text-white`}
      >
        <div className="px-4 lg:mx-auto lg:max-w-[1800px] flex items-center justify-center lg:justify-between h-full gap-2 relative">
          <Link to="/">
            <Logo />
          </Link>
          <MobileNav />
          <DesktopNav links={navLinks} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
