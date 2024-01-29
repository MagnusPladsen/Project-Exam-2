import Logo from "../icons/logo/Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const mobileHeaderHeight = "60px";
const desktopHeaderHeight = "80px";

const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Log in", path: "/login" },
];
function Header() {
  const height = `h-[${mobileHeaderHeight}] lg:h-[${desktopHeaderHeight}]`;
  return (
    <header>
      <nav
        style={{ height: mobileHeaderHeight }}
        className={` ${height} bg-primary text-white`}
      >
        <div className="px-4 flex items-center justify-center lg:justify-between h-full gap-2 relative">
          <Logo />
          <MobileNav links={navLinks} mobileHeaderHeight={mobileHeaderHeight} />
          <DesktopNav links={navLinks} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
