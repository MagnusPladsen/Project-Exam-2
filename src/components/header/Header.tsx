import Logo from "../logo/Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const headerHeight = "60px";

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Log in", path: "/login" },
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
          <Logo />
          <MobileNav links={navLinks} headerHeight={headerHeight} />
          <DesktopNav links={navLinks} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
