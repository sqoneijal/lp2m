import React, { Suspense, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { jekel, statusPerkawinan, render_keterampilan_khusus } from "Root/Helpers";
import moment from "moment";
moment.locale("id");

const Buttons = React.lazy(() => import("Root/Buttons"));

const OutputCetak = ({ isSubmit, content }) => {
   // bool
   const [showPrintButton, setShowPrintButton] = useState(false);

   // string
   const [nama, setNama] = useState("");
   const [tpt_lahir, setTpt_lahir] = useState("");
   const [tgl_lahir, setTgl_lahir] = useState("");
   const [jk, setJk] = useState("");
   const [alamat, setAlamat] = useState("");
   const [nama_fakultas, setNama_fakultas] = useState("");
   const [nama_prodi, setNama_prodi] = useState("");
   const [nim, setNim] = useState("");
   const [ayah_nama, setAyah_nama] = useState("");
   const [pekerjaan_ayah, setPekerjaan_ayah] = useState("");
   const [ayah_alamat, setAyah_alamat] = useState("");
   const [ipk, setIpk] = useState("");
   const [pendidikan_sebelumnya, setPendidikan_sebelumnya] = useState("");
   const [status_perkawinan, setStatus_perkawinan] = useState("");
   const [keterampilan_khusus, setKeterampilan_khusus] = useState("");
   const [organisasi, setOrganisasi] = useState("");
   const [nomor_peserta, setNomor_peserta] = useState("");
   const [alamat_di_banda_aceh, setAlamat_di_banda_aceh] = useState("");
   const [telp, setTelp] = useState("");
   const [email, setEmail] = useState("");
   const [ukuran_baju, setUkuran_baju] = useState("");
   const [penyakit, setPenyakit] = useState("");

   useEffect(() => {
      if (Object.keys(content).length > 0) {
         setShowPrintButton(true);
         setNama(content.nama);
         setTpt_lahir(content.tpt_lahir);
         setTgl_lahir(content.tgl_lahir);
         setJk(content.jk);
         setAlamat(content.alamat);
         setNama_fakultas(content.nama_fakultas);
         setNama_prodi(content.nama_prodi);
         setNim(content.nim);
         setAyah_nama(content.ayah_nama);
         setPekerjaan_ayah(content.pekerjaan_ayah);
         setAyah_alamat(content.ayah_alamat);
         setIpk(content.ipk);
         setPendidikan_sebelumnya(content.pendidikan_sebelumnya);
         setStatus_perkawinan(content.status_perkawinan);
         setKeterampilan_khusus(content.keterampilan_khusus);
         setOrganisasi(content.organisasi);
         setNomor_peserta(content.nomor_peserta);
         setAlamat_di_banda_aceh(content.alamat_di_banda_aceh);
         setTelp(content.telp);
         setEmail(content.email);
         setUkuran_baju(content.ukuran_baju);
         setPenyakit(content.penyakit);
      }
      return () => {};
   }, [content]);

   return (
      <React.Fragment>
         {(() => {
            if (showPrintButton) {
               return (
                  <Suspense fallback={<div>Loading...</div>}>
                     <Buttons
                        label="Cetak Biodata"
                        size="sm"
                        onClick={(e) => {
                           e.preventDefault();
                           $("<iframe>").hide().attr("src", `/cetakbiodata/${nim}`).appendTo("body");
                        }}
                     />
                  </Suspense>
               );
            }
         })()}
         <Table className="align-middle table-row-dashed fs-6" responsive>
            <tbody>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0" style={{ width: "25%" }}>
                     Nama
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : nama}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Tempat dan Tanggal Lahir
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">
                     {isSubmit ? "Loading..." : `${tpt_lahir}, ${tgl_lahir ? moment(tgl_lahir).format("DD MMMM YYYY") : "-"}`}
                  </td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Jenis Kelamin
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : jekel(jk)}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Alamat
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : alamat}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Fakultas / Jurusan
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : `${nama_fakultas} - ${nama_prodi}`}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Nomor Induk Mahasiswa
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : nim}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Orang Tua
                  </td>
               </tr>
               <tr>
                  <td style={{ width: "1%" }} />
                  <td className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">a. Nama Orang Tua</td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : ayah_nama}</td>
               </tr>
               <tr>
                  <td />
                  <td className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">b. Pekerjaan Orang Tua</td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : pekerjaan_ayah}</td>
               </tr>
               <tr>
                  <td />
                  <td className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">c. Alamat Orang Tua</td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : ayah_alamat}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     IPK Terakhir
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : ipk}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Pendidikan Terakhir Sebelum Masuk UIN
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : pendidikan_sebelumnya}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Status Perkawinan
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : statusPerkawinan(status_perkawinan)}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0" style={{ verticalAlign: "top" }}>
                     Keterampilan Khusus
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">
                     {isSubmit ? "Loading..." : render_keterampilan_khusus(keterampilan_khusus)}
                  </td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Organisasi
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : organisasi}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Nomor Peserta
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : nomor_peserta}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Alamat Lengkap di Banda Aceh
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : alamat_di_banda_aceh}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Telepon / HP
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : telp}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     E-mail
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : email}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Ukuran Baju Jaket
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : ukuran_baju}</td>
               </tr>
               <tr>
                  <td colSpan={2} className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                     Jenis penyakit yang sering dialami
                  </td>
                  <td className="text-gray-600 fw-semibold text-uppercase">{isSubmit ? "Loading..." : penyakit}</td>
               </tr>
            </tbody>
         </Table>
      </React.Fragment>
   );
};
export default OutputCetak;
