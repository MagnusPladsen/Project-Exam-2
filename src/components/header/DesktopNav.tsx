function DesktopNav({ links }: { links: string[] }) {
  return (
    <ul className="lg:flex gap-10 hidden">
      {links.map((link) => (
        <li key={link}>{link}</li>
      ))}
    </ul>
  );
}

export default DesktopNav;
