import React, { useEffect } from "react";

const Info = () => {
   useEffect(() => {
      new Typed("#typedjs", {
         strings: ["Silahkan tentukan daftar matakuliah apa saja yang diakui sebagai matakuliah KPM"],
         typeSpeed: 5,
         smartBackspace: true,
      });
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="pt-5 pb-10">
            <div className="d-flex align-items-center rounded py-5 px-4 bg-light-info">
               <div className="d-flex h-80px w-80px flex-shrink-0 flex-center position-relative ms-3 me-6">
                  <span className="svg-icon svg-icon-info position-absolute opacity-10">
                     <svg className=". w-80px h-80px ." xmlns="http://www.w3.org/2000/svg" width="70px" height="70px" viewBox="0 0 70 70" fill="none">
                        <path
                           d="M28 4.04145C32.3316 1.54059 37.6684 1.54059 42 4.04145L58.3109 13.4585C62.6425 15.9594 65.3109 20.5812 65.3109 25.5829V44.4171C65.3109 49.4188 62.6425 54.0406 58.3109 56.5415L42 65.9585C37.6684 68.4594 32.3316 68.4594 28 65.9585L11.6891 56.5415C7.3575 54.0406 4.68911 49.4188 4.68911 44.4171V25.5829C4.68911 20.5812 7.3575 15.9594 11.6891 13.4585L28 4.04145Z"
                           fill="currentColor"
                        ></path>
                     </svg>
                  </span>
                  <span className="svg-icon svg-icon-3x svg-icon-info position-absolute">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                           opacity="0.3"
                           d="M22 19V17C22 16.4 21.6 16 21 16H8V3C8 2.4 7.6 2 7 2H5C4.4 2 4 2.4 4 3V19C4 19.6 4.4 20 5 20H21C21.6 20 22 19.6 22 19Z"
                           fill="currentColor"
                        ></path>
                        <path
                           d="M20 5V21C20 21.6 19.6 22 19 22H17C16.4 22 16 21.6 16 21V8H8V4H19C19.6 4 20 4.4 20 5ZM3 8H4V4H3C2.4 4 2 4.4 2 5V7C2 7.6 2.4 8 3 8Z"
                           fill="currentColor"
                        ></path>
                     </svg>
                  </span>
               </div>
               <div className="text-gray-700 fw-bold fs-6 lh-lg" id="typedjs" />
            </div>
         </div>
      </React.Fragment>
   );
};
export default Info;
