import React, { Suspense, useLayoutEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { error_code_http, get, notification } from "Root/Helpers";

const Forms = React.lazy(() => import("./Forms"));
const InformasiSyarat = React.lazy(() => import("./InformasiSyarat"));

const Context = () => {
   // bool
   const [isLoadingDropdownList, setIsLoadingDropdownList] = useState(true);

   // object
   const [periodeAktif, setPeriodeAktif] = useState({});
   const [informasiSyaratKPM, setInformasiSyaratKPM] = useState({});
   const [jadwalPendaftaran, setJadwalPendaftaran] = useState({});

   // array
   const [jenisKPM, setJenisKPM] = useState([]);

   const propsForms = { isLoadingDropdownList, periodeAktif, jenisKPM, jadwalPendaftaran };
   const propsInformasiSyarat = { isLoadingDropdownList, informasiSyaratKPM };

   const getDropdownList = () => {
      setIsLoadingDropdownList(true);
      get("/getdropdownlist")
         .then((res) => {
            const { data } = res;
            setPeriodeAktif(data.periodeAktif);
            setInformasiSyaratKPM(data.informasiSyaratKPM);
            setJenisKPM(data.jenisKPM);
            setJadwalPendaftaran(data.jadwalPendaftaran);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingDropdownList(false);
         });
   };

   useLayoutEffect(() => {
      getDropdownList();
      return () => {};
   }, []);

   return (
      <Container fluid={true} className="mb-20">
         <Row>
            <Col md={7} xs={12} className="mb-20">
               <Suspense fallback={<div>Loading...</div>}>
                  <Forms {...propsForms} />
               </Suspense>
            </Col>
            <Col md={5} xs={12} className="mb-20">
               <Suspense fallback={<div>Loading...</div>}>
                  <InformasiSyarat {...propsInformasiSyarat} />
               </Suspense>
            </Col>
         </Row>
      </Container>
   );
};
export default Context;
