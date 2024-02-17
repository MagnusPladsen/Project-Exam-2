function PrimaryButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${className} w-fit py-3 px-5 bg-primary hover:bg-white border border-primary transition-all rounded-lg text-white hover:text-primary font-bold`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
