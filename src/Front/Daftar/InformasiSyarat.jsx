import { decode } from "html-entities";
import HtmlReactParse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

const InformasiSyarat = ({ isLoadingDropdownList, informasiSyaratKPM }) => {
   // string
   const [content, setContent] = useState("");

   useEffect(() => {
      if (Object.keys(informasiSyaratKPM).length > 0) {
         setContent(HtmlReactParse(decode(`${informasiSyaratKPM.content}`)));
      }
      return () => {};
   }, [informasiSyaratKPM]);

   return (
      <div className="mb-n10 mb-lg-n20 z-index-2">
         <Container fluid={false}>
            <div className="text-center mb-17">
               <h3 className="fs-2hx text-dark mb-5">Syarat Pendaftaran KPM</h3>
            </div>
            <Row className="mb-md-20">{isLoadingDropdownList ? <p>Loading...</p> : content}</Row>
         </Container>
      </div>
   );
};
export default InformasiSyarat;
