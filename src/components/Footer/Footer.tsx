import Logo from "../icons/logo/Logo";

function Footer() {
  return (
    <nav
      className={`px-4 h-[200px] bg-primary`}
    >
      <div className="flex items-start justify-start w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}
export default Footer;
