function SecondaryButton({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${className} disabled:text-gray-400 w-fit py-3 px-5 border border-white hover:bg-white transition-all rounded-lg text-primary hover:border-primary hover:text-primary font-medium`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
