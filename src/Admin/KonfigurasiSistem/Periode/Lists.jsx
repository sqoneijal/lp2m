import React, { Suspense, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { initDatatable, confirmDelete, notification, is_active_periode, get, error_code_http, periode } from "Root/Helpers";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const ButtonsDashed = React.lazy(() => import("Root/ButtonsDashed"));

let datatable;
let datatable_url = "/getdata";

const Lists = ({ setOpenForms }) => {
   // bool
   const [isLoadingTutupPeriode, setIsLoadingTutupPeriode] = useState(false);

   useEffect(() => {
      datatable = initDatatable({
         show_edit_button: false,
         show_delete_button: true,
         url: datatable_url,
         columns: [
            {
               data: null,
               render: (data) => {
                  return periode(data.tahun_ajaran, data.id_semester);
               },
            },
            {
               data: null,
               class: "text-center",
               render: (data) => {
                  return is_active_periode(data.is_active);
               },
            },
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

   const handleTutupPeriodeAktif = () => {
      setIsLoadingTutupPeriode(true);
      get("/handletutupperiodeaktif")
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            data.status && datatable.reload();
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingTutupPeriode(false);
         });
   };

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
         </Suspense>
         <Card>
            <Card.Body className="p-5">
               <div className="d-flex flex-stack flex-wrap mb-5">
                  <div className="d-flex justify-content-end">
                     <Suspense fallback={<div>Loading...</div>}>
                        <ButtonsDashed
                           label={isLoadingTutupPeriode ? "Loading..." : "Tutup Periode Aktif"}
                           size="sm"
                           variant="outline-danger btn-active-light-danger"
                           onClick={handleTutupPeriodeAktif}
                        />
                     </Suspense>
                  </div>
               </div>
               <Table id="datatable" className="align-middle table-row-dashed fs-6">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>periode</th>
                        <th>status</th>
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
