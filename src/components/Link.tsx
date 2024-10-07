import type { Link } from "../types/types";
const LinkElement = ({ link }: { link: Link }) => {
  return (
    <li>
      <a
        title={link.title}
        href={link.href}
        className={`${link.active ? "active" : ""} rounded-lg p-3 flex gap-3 items-center hover:bg-[#dcdcf5] hover:scale-[] transition-all duration-300 ease-in-out`}
      >
        <link.icon />
        <span>{link.title}</span>
      </a>
    </li>
  );
};

export default LinkElement;
