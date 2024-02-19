import LogoIcon from "../icons/LogoIcon.component";

function Logo({
  textClassName = "",
  logoSize = "36",
  containerClassName = "",
  isMobile = false,
}: {
  textClassName?: string;
  logoSize?: string;
  containerClassName?: string;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`${containerClassName} flex items-center justify-center h-full gap-2`}
    >
      <LogoIcon size={isMobile ? "24" : logoSize} />
      <p
        className={`${textClassName} text-white font-extrabold tracking-tight leading-none text-xl lg:text-2xl`}
      >
        Holidaze
      </p>
    </div>
  );
}

export default Logo;
