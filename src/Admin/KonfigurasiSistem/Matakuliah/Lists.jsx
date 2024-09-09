import React, { Suspense, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { initDatatable, confirmDelete, notification } from "Root/Helpers";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Info = React.lazy(() => import("./Info"));

let datatable;
let datatable_url = "/getdata";

const Lists = ({ setOpenForms }) => {
   useEffect(() => {
      datatable = initDatatable({
         show_edit_button: false,
         show_delete_button: true,
         url: datatable_url,
         columns: [
            { data: "kode_mk", class: "text-center" },
            { data: "nama_matakuliah" },
            { data: "sks_matakuliah", class: "text-center" },
            { data: null },
         ],
         columnDefs: true,
         createdRow: (row, data) => {
            const _delete = row.querySelector("#delete");
            if (_delete) {
               _delete.onclick = (e) => {
                  e.preventDefault();
                  const _delete = confirmDelete({
                     url: "/hapus",
                     id: data.id,
                  });
                  _delete.then((res) => {
                     const { data } = res;
                     notification(data.status, data.msg_response);
                     if (data.status) {
                        datatable.reload();
                     }
                  });
               };
            }
         },
      });
      datatable.init();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading..</div>}>
            <Breadcrumbs
               position={["Konfigurasi Sistem", document.title]}
               button={{
                  label: `Tambah ${document.title}`,
                  size: "sm",
                  variant: "outline-primary btn-active-light-primary",
                  onClick: (e) => {
                     e.preventDefault();
                     setOpenForms(true);
                  },
               }}
            />
            <Info />
         </Suspense>
         <Card>
            <Card.Body>
               <Table id="datatable" responsive className="align-middle table-row-dashed fs-6">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>kode matakuliah</th>
                        <th>nama matakuliah</th>
                        <th>sks matakuliah</th>
                        <th />
                     </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold"></tbody>
               </Table>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Lists;
