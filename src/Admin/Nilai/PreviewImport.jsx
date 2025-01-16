import React from "react";
import { Card, Table } from "react-bootstrap";
import { Each } from "Root/Each";
import { notification, post } from "Root/Helpers";

const PreviewImport = ({ state, setState }) => {
   const handleImport = () => {
      const formData = { daftar: JSON.stringify(state.daftarMahasiswa) };

      setState((prev) => ({ ...prev, isLoadingImport: true }));
      const fetch = post(`/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         notification(data.status, data.msg_response);

         if (!data.status) return;

         setState((prev) => ({ ...prev, daftarMahasiswa: [] }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingImport: false }));
      });
   };

   return (
      <Card.Body>
         <button className="btn btn-sm btn-primary" disabled={state.isLoadingImport} onClick={() => (state.isLoadingImport ? null : handleImport())}>
            {state.isLoadingImport ? "Loading..." : "Import Data Nilai"}
         </button>
         <Table id="datatable" className="align-middle table-row-dashed fs-6">
            <thead>
               <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                  {/* <th>nomor peserta</th> */}
                  <th>nim</th>
                  <th>nama</th>
                  <th className="text-center">ipk</th>
                  <th className="text-center">nilai</th>
                  <th>nomor sertifikat</th>
                  <th>tanggal sertifikat</th>
                  <th>keterangan/lokasi</th>
               </tr>
            </thead>
            <tbody className="text-gray-600 fw-semibold">
               <Each
                  of={state.daftarMahasiswa}
                  render={(row) => (
                     <tr>
                        {/* <td>{row.nomor_peserta}</td> */}
                        <td>{row.nim}</td>
                        <td>{row.nama}</td>
                        <td className="text-center">{row.ipk}</td>
                        <td className="text-center">{row.nilai}</td>
                        <td>{row.nomor_sertifikat}</td>
                        <td>{row.tanggal_sertifikat}</td>
                        <td>{row.keterangan}</td>
                     </tr>
                  )}
               />
            </tbody>
         </Table>
      </Card.Body>
   );
};
export default PreviewImport;
