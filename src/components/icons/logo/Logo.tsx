import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <LogoIcon />
      <p className="text-white text-2xl tracking-wide">Holidaze</p>
    </div>
  );
}

export default Logo;
