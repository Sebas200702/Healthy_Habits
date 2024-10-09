import type { Link } from "../types/types";
const LinkElement = ({ link }: { link: Link }) => {
  return (
    <li>
      <a
        title={link.title}
        href={link.href}
        className={`${link.active ? "active" : ""} rounded-lg md:p-3 p-2 flex md:gap-3 gap-2 items-center hover:bg-[#dcdcf5] hover:scale-[] transition-all duration-300 ease-in-out`}
      >
        <link.icon />
        <span className="hidden md:flex ">{link.title}</span>
      </a>
    </li>
  );
};

export default LinkElement;
