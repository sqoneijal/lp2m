import moment from "moment/moment";
import React, { useLayoutEffect, useState } from "react";
import { Card } from "react-bootstrap";
import readXlsxFile from "read-excel-file";
import { error_code_http, get, notification, post } from "Root/Helpers";
import writeXlsxFile from "write-excel-file";
import PreviewImport from "./PreviewImport";

const Context = () => {
   const [state, setState] = useState({
      isLoadingDownloadTemplate: false,
      isLoading: true,
      daftarPeriode: [],
      daftarMahasiswa: [],
      isLoadingImport: false,
   });

   const initPage = () => {
      const fetch = get(`/initpage`);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;

         setState((prev) => ({ ...prev, daftarPeriode: data.daftarPeriode }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoading: false }));
      });
   };

   useLayoutEffect(() => {
      initPage();
      return () => {};
   }, []);

   const handleDownloadTemplate = () => {
      const getPeriode = state.daftarPeriode.filter((e) => e.is_active === "1");
      const periodeAktif = typeof getPeriode[0] === "undefined" ? null : `${getPeriode[0].tahun_ajaran}${getPeriode[0].id_semester}`;

      const formData = {
         periode: periodeAktif,
      };

      setState((prev) => ({ ...prev, isLoadingDownloadTemplate: true }));
      post("/downloadexcel", formData)
         .then((res) => {
            const { data } = res;
            if (!data.length) {
               return;
            }

            const content_download = [];
            data.map((row) => {
               content_download.push([
                  { value: row.nomor_peserta, type: String },
                  { value: row.nim, type: String },
                  { value: row.nama, type: String },
                  { value: row.ipk, type: String },
                  { value: row.nama_fakultas, type: String },
                  { value: row.nama_prodi, type: String },
                  { value: row.jenis_kpm, type: String },
                  { value: row.nilai, type: String },
               ]);
            });

            const array_header = [
               "NOMOR PESERTA",
               "NIM",
               "NAMA",
               "IPK",
               "FAKULTAS",
               "PRODI",
               "JENIS KPM",
               "NILAI",
               "NOMOR SERTIFIKAT",
               "TANGGAL SERTIFIKAT",
               "KETERANGAN/LOKASI",
            ];

            const HEADER_ROW = [];
            array_header.forEach((row) => {
               HEADER_ROW.push({
                  value: row,
                  fontWeight: "bold",
                  type: String,
               });
            });

            writeXlsxFile([HEADER_ROW, ...content_download], {
               fileName: "template_import_nilai.xlsx",
            });
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setState((prev) => ({ ...prev, isLoadingDownloadTemplate: false }));
         });
   };

   const props = { state, setState };

   return state.isLoading ? (
      <div>Loading...</div>
   ) : (
      <Card>
         <Card.Body>
            <button
               className="btn btn-sm btn-success"
               disabled={state.isLoadingDownloadTemplate}
               onClick={() => (state.isLoadingDownloadTemplate ? null : handleDownloadTemplate())}>
               {state.isLoadingDownloadTemplate ? "Loading..." : "Download template nilai"}
            </button>
            <label className="btn btn-sm btn-primary">
               Upload File Excel{" "}
               <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                     readXlsxFile(e.target.files[0]).then((rows) => {
                        rows.splice(0, 1);

                        const data = [];
                        rows.forEach((row) => {
                           data.push({
                              checked: false,
                              // nomor_peserta: row[0],
                              nim: row[1],
                              nama: row[2],
                              ipk: row[3],
                              nilai: row[7],
                              nomor_sertifikat: row[8],
                              tanggal_sertifikat: moment(row[9]).format("YYYY-MM-DD"),
                              keterangan: row[10],
                           });
                        });

                        setState((prev) => ({ ...prev, daftarMahasiswa: data }));
                     });
                  }}
               />
            </label>
         </Card.Body>
         {state.daftarMahasiswa.length ? <PreviewImport {...props} /> : ""}
      </Card>
   );
};
export default Context;
