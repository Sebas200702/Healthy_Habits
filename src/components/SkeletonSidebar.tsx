import "@styles/SkeletonSidebar.css";
export const SkeletonSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav
      className={`bottom-0 left-0 right-0 flex flex-col p-3 md:w-48 w-full md:h-full ${isOpen ? "" : "close"} shadow-lg dark:text-white dark:shadow-blue-400 transition-all duration-300 ease-in-out sticky md:top-0 z-50 rounded-md`}
    >
      <ul
        className={`flex gap-2 md:gap-4 md:flex-col flex-row items-center ${isOpen ? "md:items-start" : ""} justify-center md:justify-start overflow-hidden`}
      >
        <li
          className={`flex flex-row gap-2 md:gap-4 ${isOpen ? "md:h-20" : "md:h-12"} items-center`}
        >
          <div
            className={`bg-gray-200 ${!isOpen ? "md:hidden" : ""} flex md:p-3 p-2 logo rounded-lg md:h-full md:w-24 w-16 h-9 animate-pulse`}
          ></div>

          <div className="hidden md:flex p-3 ml-auto self-start items-center">
            <div className="bg-gray-200 w-8 h-8 rounded-lg animate-pulse"></div>
          </div>
        </li>
        {[...Array(6)].map((_, index) => (
          <li
            key={index}
            className={`bg-gray-200 ${!isOpen ? "md:h-12 md:w-12 " : ""}  flex md:w-40 w-10 md:h-12 h-10 p-2 gap-2 md:p-3 flex-row md:gap-3 items-center rounded animate-pulse`}
          >
            {isOpen && (
              <>
                <div className="bg-gray-300 w-8 h-8 rounded animate-pulse"></div>
                <div className="bg-gray-300 flex-1 h-4 rounded animate-pulse"></div>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
