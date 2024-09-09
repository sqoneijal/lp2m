import React, { Suspense, useRef, useState, useEffect } from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import { post, notification, error_code_http, is_invalid, msg_response } from "Root/Helpers";
import { decode } from "html-entities";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const BundledEditor = React.lazy(() => import("Admin/BundledEditor"));
const Buttons = React.lazy(() => import("Root/Buttons"));

const Forms = ({ pageType, setPageType, setOpenForms, detailContent }) => {
   const editorRef = useRef(null);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [id, setId] = useState("");
   const [judul, setJudul] = useState("");
   const [content, setContent] = useState("");

   useEffect(() => {
      if (pageType === "update" && Object.keys(detailContent).length > 0) {
         setId(detailContent.id);
         setJudul(detailContent.judul);
         setContent(decode(`${detailContent.content}`));
      }
      return () => {};
   }, [pageType, detailContent]);

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
         judul: judul,
         content: editorRef.current.getContent(),
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
               position={[document.title, `${pageType === "insert" ? "Tambah" : "Perbaharui"} ${document.title}`]}
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
               <Row className="mb-3">
                  <Col xs={12}>
                     <div className="form-floating">
                        <Form.Control
                           placeholder="Judul Informasi"
                           value={judul}
                           onChange={(e) => setJudul(e.target.value)}
                           isInvalid={is_invalid(errors.judul)}
                        />
                        <Form.Label className="required">Judul Informasi</Form.Label>
                        {msg_response(errors.judul)}
                     </div>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Col xs={12}>
                     <BundledEditor
                        initialValue={content}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                           height: 650,
                        }}
                     />
                  </Col>
               </Row>
               <Suspense fallback={<div>Loading...</div>}>
                  <Buttons label={isSubmit ? "Loading..." : `Simpan Data ${document.title}`} onClick={isSubmit ? null : submit} size="sm" />
               </Suspense>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Forms;
