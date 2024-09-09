import React from "react";
import { Row } from "react-bootstrap";

const TutupPendaftaran = () => {
   return (
      <React.Fragment>
         <Row className="w-100 gy-10 mb-md-20">
            <div className="d-flex flex-column flex-center">
               <img src="/assets/images/2.png" className="mw-400px" loading="lazy" />
               <div className="fs-1 fw-bolder text-dark mb-4">Jadwal pendaftaran telah ditutup.</div>
            </div>
         </Row>
      </React.Fragment>
   );
};
export default TutupPendaftaran;
