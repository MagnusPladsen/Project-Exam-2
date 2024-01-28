import LogoIcon from "./LogoIcon";

function Logo() {
  return (
    <div className="flex items-center justify-center h-full gap-2">
      <LogoIcon />
      <p className="font-black text-white text-2xl">Holidaze</p>
    </div>
  );
}

export default Logo;
