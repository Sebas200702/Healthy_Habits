import type { Link } from "../types/types";
const LinkElement = ({ link }: { link: Link }) => {
  return (
    <a
      title={link.title}
      href={link.href}
      className={`${
        link.active ? "active" : ""
      } rounded-lg md:p-3 p-2 flex md:gap-3 gap-2 items-center dark:hover:bg-black hover:bg-[#dcdcf5] hover:scale-[1.05] transition-all duration-300 ease-in-out`}
    >
      <link.icon />
      <span className="hidden md:flex ">{link.title}</span>
    </a>
  );
};

export default LinkElement;
