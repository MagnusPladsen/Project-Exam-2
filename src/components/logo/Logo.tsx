import LogoIcon from "../icons/LogoIcon";

function Logo({
  textClassName = "",
  logoSize = "36",
  containerClassName = "",
}: {
  textClassName?: string;
  logoSize?: string;
  containerClassName?: string;
}) {
  return (
    <div
      className={`${containerClassName} flex items-center justify-center h-full gap-2`}
    >
      <LogoIcon size={logoSize} />
      <p
        className={`${textClassName} text-white font-extrabold tracking-tight leading-none text-2xl`}
      >
        Holidaze
      </p>
    </div>
  );
}

export default Logo;
