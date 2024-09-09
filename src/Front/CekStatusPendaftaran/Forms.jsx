import React, { Suspense, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { post, notification, error_code_http, msg_response, is_invalid } from "Root/Helpers";

const Buttons = React.lazy(() => import("Root/Buttons"));
const HasilPengecekanStatus = React.lazy(() => import("./HasilPengecekanStatus"));

const Forms = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [listContent, setListContent] = useState([]);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [nim, setNim] = useState("");

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         nim: nim,
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);

            if (data.status) {
               setListContent(data.content);
            } else {
               notification(data.status, data.msg_response);
               setListContent([]);
            }
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
         <div className="mb-n10 mb-lg-n20 z-index-2">
            <Container fluid={false}>
               <div className="text-center mb-17">
                  <h3 className="fs-2hx text-dark mb-5">{document.title}</h3>
               </div>
               {(() => {
                  if (listContent.length > 0 && !isSubmit) {
                     return (
                        <Suspense fallback={<div>Loading...</div>}>
                           <HasilPengecekanStatus listContent={listContent} />
                        </Suspense>
                     );
                  }
               })()}
               <Row className="w-100 gy-10 mb-md-20">
                  <Form onSubmit={isSubmit ? null : submit}>
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
                        <Buttons label={isSubmit ? "Loading..." : `Cek Status Pendaftaran Saya`} />
                     </Suspense>
                  </Form>
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Forms;
