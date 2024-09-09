import React, { Suspense, useState, useEffect } from "react";
import { get, notification, error_code_http } from "Root/Helpers";

const Detail = React.lazy(() => import("./Detail"));
const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   // bool
   const [isLoadingDropdownList, setIsLoadingDropdownList] = useState(true);

   // object
   const [detailContent, setDetailContent] = useState({});

   // array
   const [daftarJenisKPM, setDaftarJenisKPM] = useState([]);
   const [daftarFakultas, setDaftarFakultas] = useState([]);
   const [daftarProdi, setDaftarProdi] = useState([]);

   const propsDetail = { detailContent, setDetailContent };
   const propsLists = { setDetailContent, isLoadingDropdownList, daftarJenisKPM, daftarFakultas, daftarProdi };

   const getDropdownList = () => {
      setIsLoadingDropdownList(true);
      get("/getdropdownlist")
         .then((res) => {
            const { data } = res;
            setDaftarJenisKPM(data.daftarJenisKPM);
            setDaftarFakultas(data.daftarFakultas);
            setDaftarProdi(data.daftarProdi);
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
               if (Object.keys(detailContent).length > 0) {
                  return <Detail {...propsDetail} />;
               } else {
                  return <Lists {...propsLists} />;
               }
            })()}
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
