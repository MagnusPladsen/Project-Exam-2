function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className="text-sm font rtl:text-right text-gray-900">{children}</h3>;
}

export default H3;
