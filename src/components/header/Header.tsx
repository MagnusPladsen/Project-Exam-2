import Logo from "../icons/logo/Logo";

export const mobileHeaderHeight = 60;
export const desktopHeaderHeight = 80;

function Header() {
  return (
    <nav
      className={`h-[${mobileHeaderHeight}px] lg:h-[${desktopHeaderHeight}px] bg-primary`}
    >
      <div className="flex items-center justify-center lg:justify-start lg:w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}

export default Header;
