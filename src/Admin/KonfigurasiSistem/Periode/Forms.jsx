import React, { Suspense, useState, useEffect } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { post, notification, error_code_http, is_invalid, msg_response } from "Root/Helpers";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Buttons = React.lazy(() => import("Root/Buttons"));

const Forms = ({ pageType, setPageType, setOpenForms, detailContent }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [tahun_ajaran, setTahun_ajaran] = useState("");
   const [id_semester, setId_semester] = useState("");

   useEffect(() => {
      if (Object.keys(detailContent).length > 0 && pageType === "update") {
         setTahun_ajaran(detailContent.tahun_ajaran);
         setId_semester(detailContent.id_semester);
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
         tahun_ajaran: tahun_ajaran,
         id_semester: id_semester,
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
                     <Col md={4} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Tahun Ajaran"
                              value={tahun_ajaran}
                              onChange={(e) => setTahun_ajaran(e.target.value)}
                              isInvalid={is_invalid(errors.tahun_ajaran)}
                              disabled={pageType === "insert" ? false : true}
                           />
                           <Form.Label className="required">Tahun Ajaran</Form.Label>
                           {msg_response(errors.tahun_ajaran)}
                        </div>
                     </Col>
                     <Col md={4} xs={12}>
                        <div className="form-floating">
                           <Form.Control
                              placeholder="Semester"
                              as="select"
                              value={id_semester}
                              onChange={(e) => setId_semester(e.target.value)}
                              isInvalid={is_invalid(errors.id_semester)}
                              disabled={pageType === "insert" ? false : true}
                           >
                              <option value="">--pilih--</option>
                              <option value="1">Ganjil</option>
                              <option value="2">Genap</option>
                              <option value="3">Pendek/Antara</option>
                           </Form.Control>
                           <Form.Label className="required">Semester</Form.Label>
                           {msg_response(errors.id_semester)}
                        </div>
                     </Col>
                  </Row>
                  <Suspense fallback={<div>Loading...</div>}>
                     <Buttons label={isSubmit ? `Loading...` : `Simpan Data ${document.title}`} size="sm" />
                  </Suspense>
               </Form>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Forms;
