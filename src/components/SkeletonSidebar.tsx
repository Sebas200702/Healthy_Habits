import React from "react";

export const SkeletonSidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav
      className={` bottom-0 left-0 right-0  flex flex-col p-3 md:w-48 w-full md:h-full ${isOpen ? "" : "close"} [box-shadow:rgba(0,_0,_0,_0.35)_0px_5px_15px] transition-all duration-300 ease-in-out sticky md:top-0 z-50 rounded-md`}
    >
      <ul className="flex gap-4 md:flex-col flex-row  items-center  md:items-start justify-center md:justify-start ">
        <li className="flex flex-row gap-2 md:gap-4 h-12 items-center">
          {isOpen && (
            <div className="skeleton-logo  flex md:p-3 p-2 logo rounded-lg"></div>
          )}
          <div className="md:flex p-3 ml-auto  hidden items-center">
            <div className="hidden md:flex skeleton-toggle w-12 h-12 rounded-lg"></div>
          </div>
        </li>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="skeleton-item flex md:w-40 h-12 p-2 gap-3 md:p-3 flex-row  md:gap-3 items-center"
          >
            <div>
              <div className="skeleton-icon w-12 h-12 rounded-lg"></div>
            </div>
            {isOpen && <div className="skeleton-text hidden md:flex"></div>}
          </div>
        ))}
      </ul>
      <style>{`
        .skeleton-sidebar {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: white;
          transition: width 0.3s ease-in-out;
          position: sticky;
          top: 0;
          z-index: 50;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .skeleton-sidebar.open {
          width: 192px;
        }
        .skeleton-sidebar.closed {
          width: 60px;
        }
        .skeleton-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .skeleton-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .skeleton-toggle {
          width: 24px;
          height: 24px;
          background-color: #e2e8f0;
        }
        .skeleton-logo {
          width: 48px;
          height: 48px;
          background-color: #e2e8f0;
        }
        .skeleton-icon {
            width: 24px;
            height: 24px;
            background-color: #e2e8f0;
        }
        .skeleton-text {
          width: 108px;
          height: 24px;
          background-color: #e2e8f0;
        }
        .skeleton-sidebar.closed .skeleton-header {
          justify-content: center;
        }
        .skeleton-sidebar.closed .skeleton-item {
          justify-content: center;
        }
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        .skeleton-icon,
        .skeleton-text {
          animation: pulse 2s ease-in-out infinite;
        }

      `}</style>
    </nav>
  );
};
