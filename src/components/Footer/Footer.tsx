import Logo from "../logo/Logo";

function Footer() {
  return (
    <nav className={`px-4 lg:mx-auto lg:max-w-[1800px] h-[200px] bg-primary`}>
      <div className="flex items-start justify-start w-fit h-full gap-2">
        <Logo />
      </div>
    </nav>
  );
}
export default Footer;
