import React, { Suspense, useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { initDatatable, notification, confirmDelete, post, error_code_http, statusPerkawinan, jekel, handleFilterDatatable } from "Root/Helpers";
import writeXlsxFile from "write-excel-file";
import moment from "moment";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const DatatableFilter = React.lazy(() => import("./DatatableFilter"));

const { periode } = content;

let datatable;
let datatable_url = "/getdata";

const Lists = ({ setDetailContent, isLoadingDropdownList, daftarJenisKPM, daftarFakultas, daftarProdi }) => {
   // bool
   const [isLoading, setIsLoading] = useState(false);
   const [applyFilter, setApplyFilter] = useState(false);

   // object
   const [filter, setFilter] = useState({});

   const propsDatatableFilter = { isLoadingDropdownList, daftarJenisKPM, daftarFakultas, daftarProdi, setApplyFilter, filter, setFilter };

   useEffect(() => {
      if (applyFilter && Object.keys(filter).length > 0) {
         handleFilterDatatable(datatable_url, filter);
         setTimeout(() => {
            setApplyFilter(false);
         }, 1);
      }
      return () => {};
   }, [applyFilter, filter]);

   useEffect(() => {
      datatable = initDatatable({
         show_edit_button: false,
         show_delete_button: true,
         url: datatable_url,
         columns: [
            {
               data: null,
               render: (data) => {
                  const nim = document.getElementById(data.nim);
                  if (nim) {
                     nim.onclick = (e) => {
                        e.preventDefault();
                        setDetailContent(data);
                     };
                  }

                  return `<a href="#" id="${data.nim}">${data.nim}</a>`;
               },
            },
            { data: "nama" },
            { data: "nama_jenis_kpm" },
            { data: "total_sks", class: "text-center" },
            { data: "ipk", class: "text-center" },
            { data: "angkatan", class: "text-center" },
            { data: "nama_prodi" },
            { data: "nama_fakultas" },
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
         where: {
            tahun_ajaran: periode.tahun_ajaran,
            id_semester: periode.id_semester,
         },
      });
      datatable.init();
      return () => {};
   }, []);

   const downloadExcel = (e) => {
      e.preventDefault();

      const formData = {
         tahun_ajaran: periode.tahun_ajaran,
         id_semester: periode.id_semester,
      };

      setIsLoading(true);
      post("/downloadexcel", formData)
         .then((res) => {
            const { data } = res;
            if (data.length > 0) {
               let content_download = [];
               data.map((row, key) => {
                  content_download.push([
                     { value: row.nomor_peserta, type: String },
                     { value: row.nim, type: String },
                     { value: row.nama, type: String },
                     { value: row.tpt_lahir, type: String },
                     { value: row.tgl_lahir ? moment(row.tgl_lahir).format("DD-MM-YYYY") : "-", type: String },
                     { value: jekel(row.jk), type: String },
                     { value: row.ipk, type: String },
                     { value: row.pendidikan_sebelumnya, type: String },
                     { value: statusPerkawinan(row.status_perkawinan), type: String },
                     { value: row.keterampilan_khusus, type: String },
                     { value: row.organisasi, type: String },
                     { value: row.alamat_di_banda_aceh, type: String },
                     { value: row.telp, type: String },
                     { value: row.email, type: String },
                     { value: row.ukuran_baju, type: String },
                     { value: row.penyakit, type: String },
                     { value: row.alamat, type: String },
                     { value: row.nama_fakultas, type: String },
                     { value: row.nama_prodi, type: String },
                     { value: row.ayah_nama, type: String },
                     { value: row.ayah_pekerjaan, type: String },
                     { value: row.ayah_alamat, type: String },
                  ]);
               });

               const array_header = [
                  "NOMOR PESERTA",
                  "NIM",
                  "NAMA",
                  "TEMPAT LAHIR",
                  "TANGGAL LAHIR",
                  "JENIS KELAMIN",
                  "IPK",
                  "PENDIDIKAN SEBELUMNYA",
                  "STATUS PERKAWINAN",
                  "KETERAMPILAN KHUSUS",
                  "ORGANISASI",
                  "ALAMAT DI BANDA ACEH",
                  "TELEPON/HP",
                  "EMAIL",
                  "UKURAN BAJU/JAKET",
                  "JENIS PENYAKIT",
                  "ALAMAT",
                  "FAKULTAS",
                  "PRODI",
                  "NAMA ORANG TUA",
                  "PEKERJAAN ORANG TUA",
                  "ALAMAT ORANG TUA",
               ];

               let HEADER_ROW = [];
               array_header.map((row) => {
                  HEADER_ROW.push({
                     value: row,
                     fontWeight: "bold",
                     type: String,
                  });
               });

               writeXlsxFile([HEADER_ROW, ...content_download], {
                  fileName: "peserta_kpm.xlsx",
               });
            }
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading..</div>}>
            <Breadcrumbs
               button={{
                  label: isLoading ? `Loading...` : `Download Data Excel`,
                  size: "sm",
                  variant: "outline-success btn-active-light-success",
                  onClick: downloadExcel,
               }}
            />
         </Suspense>
         <Card>
            <Card.Body className="p-5">
               <DatatableFilter {...propsDatatableFilter} />
               <Table id="datatable" className="align-middle table-row-dashed fs-6">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th>nim</th>
                        <th>nama</th>
                        <th>jenis kpm</th>
                        <th>total sks</th>
                        <th>ipk</th>
                        <th>angkatan</th>
                        <th>prodi</th>
                        <th>fakultas</th>
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
