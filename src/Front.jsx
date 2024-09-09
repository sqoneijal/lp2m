import React, { Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import nav from "Front/Navigation.json";
import { Container } from "react-bootstrap";

const Home = React.lazy(() => import("Front/Home"));
const Daftar = React.lazy(() => import("Front/Daftar/Context"));
const Informasi = React.lazy(() => import("Front/Informasi/Context"));
const CekStatusPendaftaran = React.lazy(() => import("Front/CekStatusPendaftaran/Context"));
const CetakBiodata = React.lazy(() => import("Front/CetakBiodata/Context"));
const DaftarMatkulKPM = React.lazy(() => import("Front/DaftarMatkulKPM/Context"));
const MobileNavigation = React.lazy(() => import("Front/MobileNavigation"));

const Front = () => {
   // bool
   const [openNavMobile, setOpenNavMobile] = useState(false);

   const propsMobileNavigation = { nav, openNavMobile, setOpenNavMobile };

   return (
      <React.Fragment>
         <div className="mb-0">
            <div
               className="bgi-no-repeat bgi-size-contain bgi-position-x-center bgi-position-y-bottom landing-dark-bg"
               style={{ backgroundImage: `url(assets/media/svg/illustrations/landing.svg)` }}
            >
               <div className="landing-header">
                  <div className="container">
                     <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center flex-equal">
                           <button
                              className="btn btn-icon btn-active-color-primary me-3 d-flex d-lg-none"
                              onClick={(e) => setOpenNavMobile((prev) => !prev)}
                           >
                              <span className="svg-icon svg-icon-2hx">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="black" />
                                    <path
                                       opacity="0.3"
                                       d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                                       fill="black"
                                    />
                                 </svg>
                              </span>
                           </button>
                           <a href="/">
                              <img
                                 alt="Logo"
                                 src="https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png"
                                 className="logo-default h-25px h-lg-30px"
                                 loading="lazy"
                              />
                              <img
                                 alt="Logo"
                                 src="https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png"
                                 className="logo-sticky h-20px h-lg-25px"
                                 loading="lazy"
                              />
                           </a>
                        </div>
                        <div className="d-lg-block">
                           {(() => {
                              if (window.matchMedia("(max-width: 480px)").matches) {
                                 return (
                                    <Suspense fallback={<div>Loading...</div>}>
                                       <MobileNavigation {...propsMobileNavigation} />
                                    </Suspense>
                                 );
                              } else {
                                 return (
                                    <div className="d-lg-block p-5 p-lg-0">
                                       <div className="menu menu-column flex-nowrap menu-rounded menu-lg-row menu-title-gray-500 menu-state-title-primary nav nav-flush fs-5 fw-bold">
                                          {nav.map((data, index) => {
                                             return (
                                                <div className="menu-item" key={index}>
                                                   <a
                                                      href={data.url}
                                                      className={`menu-link nav-link py-3 px-4 px-xxl-6 ${
                                                         segment[1] === data.active ? "active" : ""
                                                      }`}
                                                   >
                                                      {data.label}
                                                   </a>
                                                </div>
                                             );
                                          })}
                                       </div>
                                    </div>
                                 );
                              }
                           })()}
                        </div>
                        <div className="flex-equal text-end ms-1">
                           <a href="/login" className="btn btn-success">
                              Login
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="d-flex flex-column flex-center w-100 min-h-350px min-h-lg-500px px-9">
                  <div className="text-center mb-5 mb-lg-10 py-10 py-lg-20">
                     <h1 className="text-white lh-base fw-bolder fs-2x fs-lg-3x mb-5" id="h1">
                        Selamat datang di website pendaftaran
                        <br />
                        <span
                           style={{
                              background: "linear-gradient(to right, #12CE5D 0%, #FFD80C 100%)",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                           }}
                        >
                           <span id="kt_landing_hero_text">KPM</span>
                        </span>
                     </h1>
                     <h5 className="text-white lh-base fw-bolder fs-2x">
                        Yang dilaksanakan oleh Lembaga Penelitian dan Pengabdian Masyarakat (LP2M)
                     </h5>
                  </div>
               </div>
            </div>
            <div className="landing-curve landing-dark-color mb-10 mb-lg-20">
               <svg viewBox="15 12 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M0 11C3.93573 11.3356 7.85984 11.6689 11.7725 12H1488.16C1492.1 11.6689 1496.04 11.3356 1500 11V12H1488.16C913.668 60.3476 586.282 60.6117 11.7725 12H0V11Z"
                     fill="currentColor"
                  ></path>
               </svg>
            </div>
         </div>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="daftar" element={<Daftar />} />
               <Route path="informasi/:id" element={<Informasi />} />
               <Route path="cekstatuspendaftaran" element={<CekStatusPendaftaran />} />
               <Route path="cetakbiodata" element={<CetakBiodata />} />
               <Route path="daftarmatkulkpm" element={<DaftarMatkulKPM />} />
            </Routes>
         </BrowserRouter>
         <div className="mb-0">
            <div className="landing-curve landing-dark-color">
               <svg viewBox="15 -1 1470 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M1 48C4.93573 47.6644 8.85984 47.3311 12.7725 47H1489.16C1493.1 47.3311 1497.04 47.6644 1501 48V47H1489.16C914.668 -1.34764 587.282 -1.61174 12.7725 47H1V48Z"
                     fill="currentColor"
                  ></path>
               </svg>
            </div>
            <div className="landing-dark-bg pt-20">
               <Container>
                  <div className="d-flex flex-column flex-md-row flex-stack py-7 py-lg-10">
                     <div className="d-flex align-items-center order-2 order-md-1">
                        <span className="mx-5 fs-6 fw-semibold text-gray-600 pt-1" href="https://keenthemes.com">
                           © {new Date().getFullYear()} Lembaga Penelitian dan Pengabdian Masyarakat
                        </span>
                     </div>
                     <ul className="menu menu-gray-600 menu-hover-primary fw-semibold fs-6 fs-md-5 order-1 mb-5 mb-md-0">
                        {nav.map((data, index) => {
                           return (
                              <li className="menu-item" key={index}>
                                 <a href={data.url} className="menu-link px-2">
                                    {data.label}
                                 </a>
                              </li>
                           );
                        })}
                     </ul>
                  </div>
               </Container>
            </div>
         </div>
      </React.Fragment>
   );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Front />);
