import React, { Suspense } from "react";
import { Container } from "react-bootstrap";

const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   return (
      <React.Fragment>
         <div className="z-index-2 mb-20">
            <Container fluid={false}>
               <Suspense fallback={<div>Loading...</div>}>
                  <Forms />
               </Suspense>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Context;
