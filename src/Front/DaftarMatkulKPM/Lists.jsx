import React, { useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import { initDatatable } from "Root/Helpers";

let datatable;
let datatable_url = "/getdata";

const Lists = () => {
   useEffect(() => {
      datatable = initDatatable({
         show_edit_button: true,
         show_delete_button: true,
         url: datatable_url,
         columns: [{ data: "kode_mk", class: "text-center" }, { data: "nama_matakuliah" }, { data: "sks_matakuliah", class: "text-center" }],
         columnDefs: false,
      });
      datatable.init();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="mb-n10 mb-lg-n20 z-index-2">
            <div className="d-flex flex-stack mb-5">
               <div className="d-flex align-items-center position-relative my-1">
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
                  <Form.Control className="form-control-solid w-250px ps-15" placeholder="Cari matakuliah..." data-table-search />
               </div>
            </div>
            <Table id="datatable" responsive className="align-middle table-row-dashed fs-6">
               <thead>
                  <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     <th>kode matakuliah</th>
                     <th>nama matakuliah</th>
                     <th>sks matakuliah</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 fw-semibold"></tbody>
            </Table>
         </div>
      </React.Fragment>
   );
};
export default Lists;
