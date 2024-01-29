import Logo from "../logo/Logo";

function Footer() {
  return (
    <footer>
      <div className={`p-4 lg:mx-auto lg:max-w-[1800px] h-[200px] bg-primary`}>
        <div className="flex items-start justify-start flex-col border w-full h-full gap-2">
          <Logo />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
