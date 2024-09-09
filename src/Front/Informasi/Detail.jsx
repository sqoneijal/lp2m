import React from "react";
import { Row, Col } from "react-bootstrap";

const Detail = ({ isLoadingContent, judul, content }) => {
   return (
      <React.Fragment>
         <div className="text-center mb-17">
            <h3 className="fs-2hx text-dark mb-5">{isLoadingContent ? "Loading..." : judul}</h3>
         </div>
         <Row className="w-100 gy-10 mb-md-20">
            <Col xs={12}>{isLoadingContent ? <p>Loading...</p> : content}</Col>
         </Row>
      </React.Fragment>
   );
};
export default Detail;
