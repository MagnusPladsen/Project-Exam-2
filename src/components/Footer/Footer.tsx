import Logo from "../icons/logo/Logo";

export const mobileFooterHeight = "200px";
export const desktopFooterHeight = "200px";

function Footer() {
  return (
    <nav
      className={`px-4 h-[${mobileFooterHeight}] lg:h-[${desktopFooterHeight}] bg-primary`}
    >
      <div className="flex items-start justify-start w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}
export default Footer;
