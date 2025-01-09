import React, { Suspense, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { error_code_http, is_invalid, msg_response, notification, periode, post } from "Root/Helpers";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Buttons = React.lazy(() => import("Root/Buttons"));

const Forms = ({ pageType, setPageType, setOpenForms, periodeAktif, isLoadingDropdownList, detailContent, daftarJenisKPM }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [tahun_ajaran, setTahun_ajaran] = useState("");
   const [id_semester, setId_semester] = useState("");
   const [tanggal_mulai, setTanggal_mulai] = useState("");
   const [tanggal_selesai, setTanggal_selesai] = useState("");
   const [id_jenis_kpm, setId_jenis_kpm] = useState("");
   const [keterangan, setKeterangan] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update") {
         setId(detailContent.id);
         setTahun_ajaran(detailContent.tahun_ajaran);
         setId_semester(detailContent.id_semester);
         setTanggal_mulai(detailContent.tanggal_mulai);
         setTanggal_selesai(detailContent.tanggal_selesai);
         setId_jenis_kpm(detailContent.id_jenis_kpm);
         setKeterangan(detailContent.keterangan);
      }
      return () => {};
   }, [detailContent, pageType]);

   useEffect(() => {
      if (Object.keys(periodeAktif).length > 0 && pageType === "insert") {
         setTahun_ajaran(periodeAktif.tahun_ajaran);
         setId_semester(periodeAktif.id_semester);
      }
      return () => {};
   }, [periodeAktif, pageType]);

   const clearProps = (e) => {
      e.preventDefault();
      setOpenForms(false);
      setPageType("insert");
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         pageType,
         id,
         tahun_ajaran,
         id_semester,
         tanggal_mulai,
         tanggal_selesai,
         id_jenis_kpm,
         keterangan,
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);

            data.status && clearProps(e);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading..</div>}>
            <Breadcrumbs
               position={["Konfigurasi Sistem", document.title, `${pageType === "insert" ? "Tambah" : "Perbaharui"} ${document.title}`]}
               button={{
                  label: `Batal ${pageType === "insert" ? "Tambah" : "Perbaharui"} ${document.title}`,
                  size: "sm",
                  variant: "outline-danger btn-active-light-danger",
                  onClick: clearProps,
               }}
            />
         </Suspense>
         <Card>
            <Card.Body>
               <Form onSubmit={isSubmit ? null : submit}>
                  <Row className="mb-3">
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Periode Aktif"
                              disabled={true}
                              value={periode(tahun_ajaran, id_semester)}
                              isInvalid={is_invalid(errors.tahun_ajaran) || is_invalid(errors.id_semester)}
                           />
                           <Form.Label className="required">Periode Aktif</Form.Label>
                           {msg_response(errors.tahun_ajaran) || msg_response(errors.id_semester)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Tanggal mulai pendaftaran"
                              type="date"
                              value={tanggal_mulai}
                              onChange={(e) => setTanggal_mulai(e.target.value)}
                              isInvalid={is_invalid(errors.tanggal_mulai)}
                           />
                           <Form.Label className="required">Tanggal mulai pendaftaran</Form.Label>
                           {msg_response(errors.tanggal_mulai)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Tanggal akhir pendaftaran"
                              type="date"
                              value={tanggal_selesai}
                              onChange={(e) => setTanggal_selesai(e.target.value)}
                              isInvalid={is_invalid(errors.tanggal_selesai)}
                           />
                           <Form.Label className="required">Tanggal akhir pendaftaran</Form.Label>
                           {msg_response(errors.tanggal_selesai)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Jenis KPM"
                              value={id_jenis_kpm}
                              onChange={(e) => setId_jenis_kpm(e.target.value)}
                              isInvalid={is_invalid(errors.id_jenis_kpm)}
                              disabled={pageType === "update" || isLoadingDropdownList}
                              as="select">
                              <option value="">{isLoadingDropdownList ? "Loading..." : "--pilih--"}</option>
                              {daftarJenisKPM.map((data, index) => {
                                 return (
                                    <option value={data.id} key={index}>
                                       {data.nama}
                                    </option>
                                 );
                              })}
                           </Form.Control>
                           <Form.Label className="required">Jenis KPM</Form.Label>
                           {msg_response(errors.id_jenis_kpm)}
                        </div>
                     </Col>
                  </Row>
                  <Row className="mb-3">
                     <Col md={12}>
                        <div className="form-floating">
                           <Form.Control
                              as="textarea"
                              value={keterangan}
                              onChange={(e) => setKeterangan(e.target.value)}
                              rows={10}
                              style={{ height: 100 }}
                           />
                        </div>
                     </Col>
                  </Row>
                  <Suspense fallback={<div>Loading...</div>}>
                     <Buttons label={isSubmit ? "Loading..." : `Simpan Data ${document.title}`} size="sm" />
                  </Suspense>
               </Form>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Forms;
