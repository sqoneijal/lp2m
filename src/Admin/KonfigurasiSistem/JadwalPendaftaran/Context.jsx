import React, { Suspense, useState, useEffect } from "react";
import { get, notification, error_code_http } from "Root/Helpers";

const Forms = React.lazy(() => import("./Forms"));
const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   // bool
   const [openForms, setOpenForms] = useState(false);
   const [isLoadingDropdownList, setIsLoadingDropdownList] = useState(true);

   // object
   const [periodeAktif, setPeriodeAktif] = useState({});
   const [detailContent, setDetailContent] = useState({});

   // array
   const [daftarJenisKPM, setDaftarJenisKPM] = useState([]);

   // string
   const [pageType, setPageType] = useState("insert");

   const propsForms = { pageType, setPageType, setOpenForms, periodeAktif, isLoadingDropdownList, detailContent, daftarJenisKPM };
   const propsLists = { setOpenForms, setDetailContent, setPageType };

   const getDropdownList = () => {
      setIsLoadingDropdownList(true);
      get("/getdropdownlist")
         .then((res) => {
            const { data } = res;
            setPeriodeAktif(data.periodeAktif);
            setDaftarJenisKPM(data.daftarJenisKPM);
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
         <Suspense fallback={<div>Loading...</div>}>
            {(() => {
               if (openForms) {
                  return <Forms {...propsForms} />;
               } else {
                  return <Lists {...propsLists} />;
               }
            })()}
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
