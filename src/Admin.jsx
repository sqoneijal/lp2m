import React, { Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import nav from "Admin/Navigation.json";
import "Root/custom.css";

const Header = React.lazy(() => import("Admin/Header"));
const LeftNavigation = React.lazy(() => import("Admin/LeftNavigation"));
const Dashboard = React.lazy(() => import("Admin/Dashboard/Context"));
const InformasiSyaratKPM = React.lazy(() => import("Admin/InformasiSyaratKPM/Context"));
const KonfigurasiSistemPeriode = React.lazy(() => import("Admin/KonfigurasiSistem/Periode/Context"));
const KonfigurasiSistemJadwalPendaftaran = React.lazy(() => import("Admin/KonfigurasiSistem/JadwalPendaftaran/Context"));
const KonfigurasiSistemJenisKPM = React.lazy(() => import("Admin/KonfigurasiSistem/JenisKPM/Context"));
const KonfigurasiSistemMatakuliah = React.lazy(() => import("Admin/KonfigurasiSistem/Matakuliah/Context"));
const Informasi = React.lazy(() => import("Admin/Informasi/Context"));
const PesertaKPM = React.lazy(() => import("Admin/PesertaKPM/Context"));

const Admin = () => {
   // array
   const [subMenu, setSubMenu] = useState([]);

   const propsHeader = { nav, setSubMenu };
   const propsLeftNavigation = { subMenu };

   useEffect(() => {
      nav.map((data) => {
         if (segment[2] === data.active) {
            setSubMenu(data.child);
         } else {
            setSubMenu([]);
         }
      });
      return () => {};
   }, [nav]);

   return (
      <React.Fragment>
         <div className="d-flex flex-column flex-column-fluid">
            <Header {...propsHeader} />
            <Container fluid={true} className="d-flex flex-column-fluid align-items-stretch">
               {(() => {
                  if (subMenu.length > 0) {
                     return (
                        <Suspense fallback={<div>Loading...</div>}>
                           <LeftNavigation {...propsLeftNavigation} />
                        </Suspense>
                     );
                  }
               })()}
               <div className="wrapper d-flex flex-column flex-row-fluid mt-5 mt-lg-10">
                  <div className="content flex-column-fluid">
                     <Suspense fallback={<div>Loading...</div>}>
                        <BrowserRouter basename="admin">
                           <Routes>
                              <Route path="dashboard" element={<Dashboard />} />
                              <Route path="syaratkpm" element={<InformasiSyaratKPM />} />
                              <Route path="informasi" element={<Informasi />} />
                              <Route path="pesertakpm" element={<PesertaKPM />} />
                              <Route path="konfigurasisistem">
                                 <Route path="periode" element={<KonfigurasiSistemPeriode />} />
                                 <Route path="jadwalpendaftaran" element={<KonfigurasiSistemJadwalPendaftaran />} />
                                 <Route path="jeniskpm" element={<KonfigurasiSistemJenisKPM />} />
                                 <Route path="matakuliah" element={<KonfigurasiSistemMatakuliah />} />
                              </Route>
                           </Routes>
                        </BrowserRouter>
                     </Suspense>
                  </div>
               </div>
            </Container>
         </div>
      </React.Fragment>
   );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Admin />);
