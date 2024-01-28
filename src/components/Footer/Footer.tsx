import Logo from "../icons/logo/Logo";

export const mobileFooterHeight = "60px";
export const desktopFooterHeight = "80px";

function Footer() {
  return (
    <nav
      className={`h-[${mobileFooterHeight}] lg:h-[${desktopFooterHeight}] bg-primary`}
    >
      <div className="flex items-center justify-center lg:justify-start lg:w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}
export default Footer;
