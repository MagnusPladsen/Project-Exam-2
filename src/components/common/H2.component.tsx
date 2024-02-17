function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`${className} font-medium rtl:text-right text-gray-900`}>
      {children}
    </h2>
  );
}

export default H2;
