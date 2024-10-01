import type { Link } from "../types/types";
const LinkElement = ({ link }: { link: Link }) => {
  return (
    <li>
      <a
        title={link.title}
        href={link.href}
        className={link.active ? "active" : ""}
      >
        <link.icon />
        <span>{link.title}</span>
      </a>
    </li>
  );
};

export default LinkElement;
