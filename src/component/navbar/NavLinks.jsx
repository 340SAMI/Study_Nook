import NavLink from "./NavLink";

export default function NavLinks({ links, onNavigate, className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map((link) => (
        <NavLink key={link.href} {...link} onClick={onNavigate} />
      ))}
    </div>
  );
}