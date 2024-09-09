import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { get, notification, error_code_http } from "Root/Helpers";
import HTMLReactParser from "html-react-parser";

const Informasi = () => {
   // bool
   const [isLoadingListContent, setIsLoadingListContent] = useState(true);

   // array
   const [listContent, setListContent] = useState([]);

   const getInformasiTerbaru = () => {
      setIsLoadingListContent(true);
      get("getinformasiterbaru")
         .then((res) => {
            const { data } = res;
            setListContent(data);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingListContent(false);
         });
   };

   useEffect(() => {
      getInformasiTerbaru();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="mt-20 position-relative z-index-2 mb-10">
            <Container>
               <div className="text-center mb-17">
                  <h3 className="fs-2hx text-dark mb-5">Informasi Terbaru</h3>
               </div>
               <Row className="g-lg-10 mb-10 mb-lg-20">
                  {listContent.length > 0 && !isLoadingListContent ? (
                     listContent.map((data, index) => {
                        return (
                           <Col lg={4} xs={12} key={index} style={{ cursor: "pointer" }} onClick={() => open(`/informasi/${data.id}`, "_parent")}>
                              <div className="d-flex flex-column justify-content-between h-lg-100 px-10 px-lg-0 pe-lg-10 mb-15 mb-lg-0">
                                 <div className="mb-7">
                                    <div className="fs-2 fw-bold text-dark mb-3">{data.judul}</div>
                                    <div className="text-gray-500 fw-semibold fs-4">{HTMLReactParser(`${data.content}`)}</div>
                                 </div>
                              </div>
                           </Col>
                        );
                     })
                  ) : (
                     <Col xs={12}>{isLoadingListContent ? "Loading..." : "Tidak ada informasi terbaru yang ditemukan."}</Col>
                  )}
               </Row>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Informasi;
