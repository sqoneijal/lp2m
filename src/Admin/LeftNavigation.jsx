import React from "react";

const LeftNavigation = ({ subMenu }) => {
   return (
      <div className="aside">
         <div className="hover-scroll-overlay-y my-5 my-lg-5 w-100 ps-4 ps-lg-0 pe-4 me-1" style={{ height: window.innerHeight }}>
            <div className="menu menu-column menu-active-bg menu-hover-bg menu-title-gray-700 fs-6 menu-rounded w-100">
               {subMenu.map((data, index) => {
                  return (
                     <div className="menu-item" key={index}>
                        <a href={data.url} className={`menu-link ${segment[3] === data.active ? "active" : ""}`}>
                           <span className="menu-title">{data.label}</span>
                        </a>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};
export default LeftNavigation;
