import Logo from "../icons/logo/Logo";

export const mobileHeaderHeight = "60px";
export const desktopHeaderHeight = "80px";

function Header() {
  return (
    <nav
      className={`h-[${mobileHeaderHeight}] lg:h-[${desktopHeaderHeight}] bg-primary`}
    >
      <div className="flex items-center justify-center lg:justify-start lg:w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}

export default Header;
