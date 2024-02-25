function PrimaryButton({
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${className} disabled:bg-gray-300 disabled:text-gray-400 disabled:border-gray-400 w-fit py-3 px-5 bg-primary hover:bg-white border border-primary transition-all rounded-lg text-white hover:text-primary font-medium`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
