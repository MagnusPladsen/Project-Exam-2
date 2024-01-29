import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <LogoIcon />
      <p className="text-white font-logo text-3xl tracking-wide">Holidaze</p>
    </div>
  );
}

export default Logo;
