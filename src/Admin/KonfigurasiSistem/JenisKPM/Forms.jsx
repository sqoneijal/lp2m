import React, { Suspense, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { error_code_http, is_invalid, msg_response, notification, post } from "Root/Helpers";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Buttons = React.lazy(() => import("Root/Buttons"));

const Forms = ({ pageType, setPageType, setOpenForms, detailContent }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [nama, setNama] = useState("");
   const [sks_lulus, setSks_lulus] = useState("");
   const [kode, setKode] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update") {
         setId(detailContent.id);
         setNama(detailContent.nama);
         setSks_lulus(detailContent.sks_lulus);
         setKode(detailContent.kode);
      }
      return () => {};
   }, [detailContent, pageType]);

   const clearProps = (e) => {
      e.preventDefault();
      setPageType("insert");
      setOpenForms(false);
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         pageType,
         id,
         nama,
         sks_lulus,
         kode,
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);
            notification(data.status, data.msg_response);
            if (data.status) clearProps(e);
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
                     <Col md={6} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Nama Jenis KPM"
                              value={nama}
                              onChange={(e) => setNama(e.target.value)}
                              isInvalid={is_invalid(errors.nama)}
                           />
                           <Form.Label className="required">Nama Jenis KPM</Form.Label>
                           {msg_response(errors.nama)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Kode"
                              value={kode}
                              onChange={(e) => setKode(e.target.value)}
                              isInvalid={is_invalid(errors.kode)}
                           />
                           <Form.Label className="required">Kode</Form.Label>
                           {msg_response(errors.kode)}
                        </div>
                     </Col>
                     <Col md={3} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Minimal SKS Lulus"
                              value={sks_lulus}
                              onChange={(e) => setSks_lulus(e.target.value)}
                              isInvalid={is_invalid(errors.sks_lulus)}
                           />
                           <Form.Label className="required">Minimal SKS Lulus</Form.Label>
                           {msg_response(errors.sks_lulus)}
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
