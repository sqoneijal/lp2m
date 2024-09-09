import React, { Suspense, useState, useEffect } from "react";
import { Form, Row, Col, Card } from "react-bootstrap";
import { post, notification, error_code_http, msg_response, is_invalid } from "Root/Helpers";

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

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update") {
         setId(detailContent.id);
         setNama(detailContent.nama);
         setSks_lulus(detailContent.sks_lulus);
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
         pageType: pageType,
         id: id,
         nama: nama,
         sks_lulus: sks_lulus,
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
                     <Col md={8} xs={12}>
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
                     <Col md={4} xs={12}>
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
