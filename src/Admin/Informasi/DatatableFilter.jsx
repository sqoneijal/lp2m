import React from "react";
import { Form } from "react-bootstrap";

const DatatableFilter = () => {
   return (
      <React.Fragment>
         <div className="d-flex flex-stack flex-wrap mb-5">
            <div className="d-flex align-items-center position-relative my-1 mb-2 mb-md-0">
               <span className="svg-icon svg-icon-1 position-absolute ms-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect
                        opacity="0.5"
                        x="17.0365"
                        y="15.1223"
                        width="8.15546"
                        height="2"
                        rx="1"
                        transform="rotate(45 17.0365 15.1223)"
                        fill="currentColor"
                     ></rect>
                     <path
                        d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                        fill="currentColor"
                     ></path>
                  </svg>
               </span>
               <Form.Control className="form-control-solid w-250px ps-15" placeholder="Cari informasi..." data-table-search />
            </div>
         </div>
      </React.Fragment>
   );
};
export default DatatableFilter;
