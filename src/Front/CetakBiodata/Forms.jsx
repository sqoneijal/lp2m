import React, { useState, Suspense, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { post, notification, error_code_http, msg_response, is_invalid } from "Root/Helpers";

const OutputCetak = React.lazy(() => import("./OutputCetak"));

const Forms = ({ isLoadingDropdownList, periodeAktif }) => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [content, setContent] = useState({});

   // string
   const [nim, setNim] = useState("");

   const propsOutputCetak = { isSubmit, content };

   const cariPesertaKPM = (nim) => {
      const formData = {
         nim: nim,
         tahun_ajaran: periodeAktif.tahun_ajaran,
         id_semester: periodeAktif.id_semester,
      };

      setIsSubmit(true);
      post("/caripesertakpm", formData)
         .then((res) => {
            const { data } = res;
            if (Object.keys(data).length > 0) {
               setContent(data);
            } else {
               setContent({});
               setErrors({ nim: "Anda belum terdaftar pada periode ini. Silahkan melakukan pendaftaran terlebih dahulu?" });
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
      nim.length >= 9 && cariPesertaKPM(nim);
      return () => {};
   }, [nim]);

   return (
      <React.Fragment>
         <div className="mb-n10 mb-lg-n20 z-index-2">
            <Container fluid={false}>
               <div className="text-center mb-17">
                  <h3 className="fs-2hx text-dark mb-5">{document.title}</h3>
               </div>
               <Row className="w-100 gy-10 mb-md-20">
                  <Form onSubmit={isSubmit ? null : cariPesertaKPM}>
                     <Row className="mb-3">
                        <Col xs={12}>
                           <div className="form-floating">
                              <Form.Control
                                 placeholder="Ketikkan NIM anda disini..."
                                 value={nim}
                                 onChange={(e) => setNim(e.target.value)}
                                 isInvalid={is_invalid(errors.nim)}
                              />
                              <Form.Label className="required">Ketikkan NIM anda disini...</Form.Label>
                              {msg_response(errors.nim)}
                           </div>
                        </Col>
                     </Row>
                     <Suspense fallback={<div>Loading...</div>}>
                        <OutputCetak {...propsOutputCetak} />
                     </Suspense>
                  </Form>
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Forms;
