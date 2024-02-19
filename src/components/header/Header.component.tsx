import { Link } from "react-router-dom";
import Logo from "../logo/Logo.component";
import DesktopNav from "./navigation/DesktopNav.component";
import MobileNav from "./navigation/MobileNav.component";
import { NavigationLink } from "../../types/types";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useIsMobile from "../../hooks/useIsMobile";

const headerHeight = "80px";

const mobileHeaderHeight = "50px";

const navLinks: NavigationLink[] = [
  { name: "Home", path: "/" },
  { name: "Venues", path: "/venues" },
];
function Header() {
  const { isMobile } = useIsMobile();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY < 10) {
      setShow(true);
    } else if (typeof window !== "undefined") {
      setShow(true);
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move

      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header>
      <AnimatePresence initial={false}>
        {show && (
          <motion.nav
            animate={{ y: 0 }}
            initial={{ y: -80 }}
            exit={{ y: -80 }}
            transition={{ duration: 0.2 }}
            // style bevause of tailwindcss not working properly with variables sometimes
            style={{ height: isMobile ? mobileHeaderHeight : headerHeight }}
            className={` bg-primary text-white fixed w-full z-40`}
          >
            <div className="px-4 lg:mx-auto lg:max-w-[1800px] flex items-center justify-center lg:justify-between h-full gap-2 relative">
              <Link to="/">
                <Logo isMobile={isMobile} />
              </Link>
              <DesktopNav links={navLinks} />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <MobileNav />
    </header>
  );
}

export default Header;
