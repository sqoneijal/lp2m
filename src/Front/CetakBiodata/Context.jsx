import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { get, notification, error_code_http } from "Root/Helpers";

const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   // bool
   const [isLoadingDropdownList, setIsLoadingDropdownList] = useState(true);

   // object
   const [periodeAktif, setPeriodeAktif] = useState({});

   const propsForms = { isLoadingDropdownList, periodeAktif };

   const getDropdownList = () => {
      setIsLoadingDropdownList(true);
      get("/getdropdownlist")
         .then((res) => {
            const { data } = res;
            setPeriodeAktif(data.periodeAktif);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingDropdownList(false);
         });
   };

   useEffect(() => {
      getDropdownList();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="z-index-2 mb-20">
            <Container fluid={false}>
               <Suspense fallback={<div>Loading...</div>}>
                  <Forms {...propsForms} />
               </Suspense>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Context;
