import React, { Suspense, useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { get, notification, error_code_http } from "Root/Helpers";

const PeriodeAktif = React.lazy(() => import("./PeriodeAktif"));

const Context = () => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [jumlahPesertaKPM, setJumlahPesertaKPM] = useState([]);

   const propsPeriodeAktif = { isLoading, jumlahPesertaKPM };

   const getStatistik = () => {
      setIsLoading(true);
      get(`/getstatistik?periode=${content.periode.tahun_ajaran}${content.periode.id_semester}`)
         .then((res) => {
            const { data } = res;
            setJumlahPesertaKPM(data.jumlahPesertaKPM);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      getStatistik();
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <Container fluid={true} className="app-container">
            <Row className="g-5 g-xl-10 mb-5 mb-xl-10">
               <Suspense fallback={<div>Loading...</div>}>
                  <PeriodeAktif {...propsPeriodeAktif} />
               </Suspense>
            </Row>
         </Container>
      </React.Fragment>
   );
};
export default Context;
