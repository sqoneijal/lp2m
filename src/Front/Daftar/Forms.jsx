import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { error_code_http, is_invalid, jekel, msg_response, notification, periode, post } from "Root/Helpers";
moment.locale("id");

const Buttons = React.lazy(() => import("Root/Buttons"));

const daftarUkuranBaju = ["S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"];
const daftarStatusPerkawinan = [
   {
      label: "Sudah Menikah",
      id: 1,
   },
   {
      label: "Janda",
      id: 2,
   },
   {
      label: "Duda",
      id: 3,
   },
   {
      label: "Belum Menikah",
      id: 4,
   },
];

let tagify;

const Forms = ({ isLoadingDropdownList, periodeAktif, jenisKPM, jadwalPendaftaran }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);
   const [isLoadingCariMahasiswa, setIsLoadingCariMahasiswa] = useState(false);
   const [disableInput, setDisableInput] = useState(true);
   const [showSubmitButton, setShowSubmitButton] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [nomor_peserta, setNomor_peserta] = useState("");
   const [foto, setFoto] = useState("");
   const [krs_aktif, setKrs_aktif] = useState("");
   const [old_foto, setOld_foto] = useState("");
   const [id_jenis_kpm, setId_jenis_kpm] = useState("");
   const [nim, setNim] = useState("");
   const [status_perkawinan, setStatus_perkawinan] = useState("");
   const [telp, setTelp] = useState("");
   const [email, setEmail] = useState("");
   const [ukuran_baju, setUkuran_baju] = useState("");
   const [penyakit, setPenyakit] = useState("");
   const [alamat, setAlamat] = useState("");
   const [organisasi, setOrganisasi] = useState("");
   const [keterampilan_khusus, setKeterampilan_khusus] = useState("");
   const [nama, setNama] = useState("");
   const [tpt_lahir, setTpt_lahir] = useState("");
   const [tgl_lahir, setTgl_lahir] = useState("");
   const [jk, setJk] = useState("");
   const [ipk, setIpk] = useState("");
   const [total_sks, setTotal_sks] = useState("");

   useEffect(() => {
      if (id_jenis_kpm && jadwalPendaftaran.length > 0) {
         jadwalPendaftaran.map((data) => {
            if (data.id_jenis_kpm === id_jenis_kpm && data.is_open) {
               setDisableInput(false);
               setShowSubmitButton(true);
            }
         });
      } else {
         setDisableInput(true);
         setShowSubmitButton(false);
      }
      return () => {};
   }, [id_jenis_kpm, jadwalPendaftaran]);

   const clearProps = () => {
      setFoto("");
      setOld_foto("");
      setId_jenis_kpm("");
      setNim("");
      setStatus_perkawinan("");
      setTelp("");
      setEmail("");
      setUkuran_baju("");
      setPenyakit("");
      setAlamat("");
      setOrganisasi("");
      setKeterampilan_khusus("");
      setNama("");
      setTpt_lahir("");
      setTgl_lahir("");
      setJk("");
      setIpk("");
      setTotal_sks("");
      setTranskrip("");
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         tahun_ajaran: periodeAktif.tahun_ajaran,
         id_semester: periodeAktif.id_semester,
         foto,
         old_foto,
         id_jenis_kpm,
         nim,
         status_perkawinan,
         telp,
         email,
         ukuran_baju,
         penyakit,
         alamat,
         organisasi,
         keterampilan_khusus,
         total_sks,
         ipk,
         krs_aktif,
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);
            if (data.status) {
               clearProps();
               tagify.removeAllTags();
            }
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   useEffect(() => {
      const input = document.querySelector("#keterampilan_khusus");
      tagify = new Tagify(input);
      return () => {};
   }, []);

   const cariMahasiswa = (nim) => {
      const formData = {
         nim,
         tahun_ajaran: periodeAktif.tahun_ajaran,
         id_semester: periodeAktif.id_semester,
      };

      setIsLoadingCariMahasiswa(true);
      post("/carimahasiswa", formData)
         .then((res) => {
            const { data } = res;
            if (Object.keys(data).length > 0) {
               setNim(data.nim);
               setNama(data.nama);
               setTpt_lahir(data.tpt_lahir);
               setTgl_lahir(moment(data.tgl_lahir).format("DD-MM-YYYY"));
               setJk(jekel(data.jk));
               setIpk(data.ipk);
               setTotal_sks(data.total_sks);
               setOld_foto(data.foto);
               setNomor_peserta(data.nomor_peserta);
               setId_jenis_kpm(data.id_jenis_kpm);
               setStatus_perkawinan(data.status_perkawinan);
               setTelp(data.telp);
               setEmail(data.email);
               setUkuran_baju(data.ukuran_baju);
               setPenyakit(data.penyakit);
               setAlamat(data.alamat);
               setOrganisasi(data.organisasi);

               if (data.keterampilan_khusus) {
                  const set_keterampilan = [];
                  data.keterampilan_khusus.split(",").map((row) => {
                     set_keterampilan.push({ value: row });
                  });
                  tagify.addTags(set_keterampilan);
               }
               return;
            }
            notification(false, "Apakah anda sudah melakukan pembayaran SPP dan mengisi KRS!!!");
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingCariMahasiswa(false);
         });
   };

   useEffect(() => {
      if (isLoadingCariMahasiswa) {
         setNama("");
         setTpt_lahir("");
         setTgl_lahir("");
         setJk("");
         setIpk("");
         setTotal_sks("");
      }
      return () => {};
   }, [isLoadingCariMahasiswa]);

   useEffect(() => {
      if (nim.length >= 9) {
         cariMahasiswa(nim);
      }
      return () => {};
   }, [nim]);

   return (
      <div className="mb-n10 mb-lg-n20 z-index-2">
         <Container fluid={false}>
            <div className="text-center mb-17">
               <h3 className="fs-2hx text-dark mb-5">Pendaftaran KPM periode {periode(periodeAktif.tahun_ajaran, periodeAktif.id_semester)}</h3>
               <div className="fs-5 text-muted fw-bold">Pastikan pengisian biodata dengan benar</div>
            </div>
            <div className="align-items-center rounded py-5 px-4 bg-light-info mb-10">
               <div className="flex-shrink-0 flex-center position-relative ms-3 me-6">
                  <div className="text-gray-700 fw-bold fs-6 lh-lg">
                     <p>Pastikan anda telah mengambil matakuliah KPM pada semester aktif sekarang.</p>
                     <h4>Jadwal Pendaftaran Jensi KPM</h4>
                     <div className="d-flex flex-column">
                        {jadwalPendaftaran.length > 0 && !isLoadingDropdownList ? (
                           jadwalPendaftaran.map((data, index) => {
                              return (
                                 <li className="d-flex align-items-center py-2" key={data.nama_jenis_kpm}>
                                    <span className="bullet bg-primary" style={{ marginRight: 10 }} /> {data.nama_jenis_kpm} (
                                    <span className="text-info">{moment(data.tanggal_mulai).format("DD MMMM YYYY")}</span>
                                    <span className="bullet bg-danger" style={{ marginLeft: 5, marginRight: 5 }} />
                                    <span className="text-info">{moment(data.tanggal_selesai).format("DD MMMM YYYY")}</span>) minimal telah mencapai{" "}
                                    {data.sks_lulus} sks
                                 </li>
                              );
                           })
                        ) : (
                           <li className="d-flex align-items-center py-2">
                              <span className="bullet bg-primary" /> Tidak ditemukan satu pun jenis KPM yang dibuka!
                           </li>
                        )}
                     </div>
                  </div>
               </div>
            </div>
            <Row className="w-100 gy-10 mb-md-20">
               <Form onSubmit={isSubmit ? null : submit}>
                  <Row className="mb-3">
                     <Col md={4} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Jenis KPM"
                              value={id_jenis_kpm}
                              onChange={(e) => setId_jenis_kpm(e.target.value)}
                              isInvalid={is_invalid(errors.id_jenis_kpm)}
                              disabled={isLoadingDropdownList || (nomor_peserta ? true : false)}
                              as="select">
                              <option value="">{isLoadingDropdownList ? "Loading..." : "--pilih--"}</option>
                              {!isLoadingDropdownList &&
                                 jadwalPendaftaran.map((data) => {
                                    if (data.is_open) {
                                       return (
                                          <option value={data.id_jenis_kpm} key={data.id_jenis_kpm}>
                                             {data.nama_jenis_kpm}
                                          </option>
                                       );
                                    }
                                 })}
                           </Form.Control>
                           <Form.Label className="required">Jenis KPM</Form.Label>
                           {msg_response(errors.id_jenis_kpm)}
                        </div>
                     </Col>
                     <Col md={8} xs={12}>
                        <Row>
                           <Col>
                              <div className="form-floating mb-3">
                                 <Form.Control
                                    placeholder="Foto dengan latar merah"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                       setFoto(e.target.files[0]);
                                    }}
                                    isInvalid={is_invalid(errors.foto)}
                                    disabled={disableInput}
                                 />
                                 <Form.Label>Foto dengan latar merah</Form.Label>
                                 {msg_response(errors.foto)}
                              </div>
                           </Col>
                           <Col>
                              <div className="form-floating mb-3">
                                 <Form.Control
                                    placeholder="KRS Aktif"
                                    type="file"
                                    onChange={(e) => {
                                       setKrs_aktif(e.target.files[0]);
                                    }}
                                    isInvalid={is_invalid(errors.krs_aktif)}
                                    disabled={disableInput}
                                 />
                                 <Form.Label>KRS Aktif</Form.Label>
                                 {msg_response(errors.krs_aktif)}
                              </div>
                           </Col>
                        </Row>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="NIM"
                              value={nim}
                              onChange={(e) => setNim(e.target.value)}
                              isInvalid={is_invalid(errors.nim)}
                              disabled={disableInput}
                           />
                           <Form.Label className="required">NIM</Form.Label>
                           {msg_response(errors.nim)}
                        </div>
                     </Col>
                     <Col md={9} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control value={nama} placeholder={isLoadingCariMahasiswa ? "Loading..." : "Nama"} disabled={true} />
                           <Form.Label>{isLoadingCariMahasiswa ? "Loading..." : "Nama"}</Form.Label>
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control value={tpt_lahir} placeholder={isLoadingCariMahasiswa ? "Loading..." : "Tempat Lahir"} disabled={true} />
                           <Form.Label>{isLoadingCariMahasiswa ? "Loading..." : "Tempat Lahir"}</Form.Label>
                        </div>
                     </Col>
                     <Col md={2} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control value={tgl_lahir} placeholder={isLoadingCariMahasiswa ? "Loading..." : "Tanggal Lahir"} disabled={true} />
                           <Form.Label>{isLoadingCariMahasiswa ? "Loading..." : "Tanggal Lahir"}</Form.Label>
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control value={jk} placeholder={isLoadingCariMahasiswa ? "Loading..." : "Jenis Kelamin"} disabled={true} />
                           <Form.Label>{isLoadingCariMahasiswa ? "Loading..." : "Jenis Kelamin"}</Form.Label>
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Status Perkawinan"
                              as="select"
                              value={status_perkawinan}
                              onChange={(e) => setStatus_perkawinan(e.target.value)}
                              isInvalid={is_invalid(errors.status_perkawinan)}
                              disabled={disableInput}>
                              <option value="">--pilih--</option>
                              {daftarStatusPerkawinan.map((data, index) => {
                                 return (
                                    <option value={data.id} key={data.label}>
                                       {data.label}
                                    </option>
                                 );
                              })}
                           </Form.Control>
                           <Form.Label className="required">Status Perkawinan</Form.Label>
                           {msg_response(errors.status_perkawinan)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Telepon / HP"
                              value={telp}
                              onChange={(e) => setTelp(e.target.value)}
                              isInvalid={is_invalid(errors.telp)}
                              disabled={disableInput}
                           />
                           <Form.Label className="required">Telepon / HP</Form.Label>
                           {msg_response(errors.telp)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Email Aktif"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              isInvalid={is_invalid(errors.email)}
                              disabled={disableInput}
                           />
                           <Form.Label className="required">Email Aktif</Form.Label>
                           {msg_response(errors.email)}
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Penyakit yang sering dialami"
                              value={penyakit}
                              onChange={(e) => setPenyakit(e.target.value)}
                              disabled={disableInput}
                           />
                           <Form.Label>Penyakit yang sering dialami</Form.Label>
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Alamat tinggal di Banda Aceh"
                              value={alamat}
                              onChange={(e) => setAlamat(e.target.value)}
                              isInvalid={is_invalid(errors.alamat)}
                              disabled={disableInput}
                           />
                           <Form.Label className="required">Alamat tinggal di Banda Aceh</Form.Label>
                           {msg_response(errors.alamat)}
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col xs={12}>
                        <div className="form-floating mb-3">
                           <Form.Control
                              placeholder="Organisasi"
                              value={organisasi}
                              onChange={(e) => setOrganisasi(e.target.value)}
                              disabled={disableInput}
                           />
                           <Form.Label>Organisasi</Form.Label>
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col xs={12}>
                        <div className="mb-3">
                           <Form.Label>Keterampilan khusus</Form.Label>
                           <Form.Control
                              id="keterampilan_khusus"
                              placeholder="Ketikkan sesuatu disini..."
                              defaultValue={keterampilan_khusus}
                              onChange={(e) => setKeterampilan_khusus(e.target.value)}
                           />
                           <span className="text-info">
                              Misalnya : Pidato, Khutbah, Baca Al-Qur'an, PKK, Mengajar, Membuat Kue, Merangkai Bunga, Masak - Memasak, Penataan
                              Ruangan dan lain - lain. (Dapat diisi boleh lebih dari satu keterampilan)
                           </span>
                        </div>
                     </Col>
                  </Row>
                  {(() => {
                     if (showSubmitButton) {
                        return (
                           <Suspense fallback={<div>Loading...</div>}>
                              <Buttons label={isSubmit ? "Loading..." : "Daftar"} />
                           </Suspense>
                        );
                     }
                  })()}
               </Form>
            </Row>
         </Container>
      </div>
   );
};
export default Forms;
