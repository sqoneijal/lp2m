import React, { Suspense } from "react";
import { Container } from "react-bootstrap";

const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   return (
      <React.Fragment>
         <div className="z-index-2 mb-20">
            <Container fluid={false}>
               <Suspense fallback={<div>Loading...</div>}>
                  <Lists />
               </Suspense>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Context;
