import React, { Suspense, useEffect, useState } from "react";
import { error_code_http, get, notification } from "Root/Helpers";

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
   const [daftarPeriode, setDaftarPeriode] = useState([]);

   const propsDetail = { detailContent, setDetailContent };
   const propsLists = { setDetailContent, isLoadingDropdownList, daftarJenisKPM, daftarFakultas, daftarProdi, daftarPeriode };

   const getDropdownList = () => {
      setIsLoadingDropdownList(true);
      get("/getdropdownlist")
         .then((res) => {
            const { data } = res;
            setDaftarJenisKPM(data.daftarJenisKPM);
            setDaftarFakultas(data.daftarFakultas);
            setDaftarProdi(data.daftarProdi);
            setDaftarPeriode(data.daftarPeriode);
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
      <Suspense fallback={<div>Loading...</div>}>
         {Object.keys(detailContent).length > 0 ? <Detail {...propsDetail} /> : <Lists {...propsLists} />}
      </Suspense>
   );
};
export default Context;
