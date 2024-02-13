function PrimaryButton({
  className,
  type = "button",
  onClick = () => {},
  children,
}: {
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} w-fit py-4 px-6 bg-primary hover:bg-white border border-primary transition-all rounded-lg text-white hover:text-primary font-bold`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
