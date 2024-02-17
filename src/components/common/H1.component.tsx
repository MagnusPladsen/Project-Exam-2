function H1({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={`${className} mb-5 text-3xl text-center tracking-tight font-extrabold text-gray-900 dark:text-white truncate text-ellipsis`}
    >
      {children}
    </h1>
  );
}

export default H1;
