import React, { useEffect } from "react";

const MobileNavigation = ({ nav, openNavMobile, setOpenNavMobile }) => {
   return (
      <React.Fragment>
         <div className={`d-lg-block p-5 p-lg-0 drawer drawer-start ${openNavMobile ? "drawer-on" : ""}`}>
            <div className="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-500 menu-state-title-primary nav nav-flush fs-5 fw-semibold">
               {nav.map((data, index) => {
                  return (
                     <div className="menu-item" key={index}>
                        <a className="menu-link nav-link py-3 px-4 px-xxl-6" href={data.url}>
                           {data.label}
                        </a>
                     </div>
                  );
               })}
               <div className="menu-item">
                  <a
                     className="menu-link nav-link py-3 px-4 px-xxl-6"
                     href="#"
                     onClick={(e) => {
                        e.preventDefault();
                        setOpenNavMobile(false);
                     }}
                  >
                     Close
                  </a>
               </div>
            </div>
         </div>
      </React.Fragment>
   );
};
export default MobileNavigation;
