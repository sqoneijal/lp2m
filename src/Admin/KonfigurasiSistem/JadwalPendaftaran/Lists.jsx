import React, { Suspense, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { periode, initDatatable, confirmDelete, notification } from "Root/Helpers";
import moment from "moment";
moment.locale("id");

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));

let datatable;
let datatable_url = "/getdata";

const Lists = ({ setOpenForms, setDetailContent, setPageType }) => {
   useEffect(() => {
      datatable = initDatatable({
         show_edit_button: true,
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
               render: (data) => {
                  return `${moment(data.tanggal_mulai).format("DD MMMM YYYY")} - ${moment(data.tanggal_selesai).format("DD MMMM YYYY")}`;
               },
            },
            { data: "nama_jenis_kpm" },
            { data: null },
         ],
         columnDefs: true,
         createdRow: (row, data) => {
            const _edit = row.querySelector("#edit");
            if (_edit) {
               _edit.onclick = (e) => {
                  e.preventDefault();
                  setDetailContent(data);
                  setPageType("update");
                  setOpenForms(true);
               };
            }

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
         </Suspense>
         <Card>
            <Card.Body className="p-5">
               <Table id="datatable" className="align-middle table-row-dashed fs-6">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>periode</th>
                        <th>tanggal pendaftaran</th>
                        <th>jenis kpm</th>
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