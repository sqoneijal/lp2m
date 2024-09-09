import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";

const DatatableFilter = ({ isLoadingDropdownList, daftarJenisKPM, daftarFakultas, daftarProdi, setApplyFilter, filter, setFilter }) => {
   // array
   const [newDaftarProdi, setNewDaftarProdi] = useState([]);

   useEffect(() => {
      setNewDaftarProdi(daftarProdi);
      return () => {};
   }, [daftarProdi]);

   const handleChangeProdi = (id_fakultas) => {
      if (id_fakultas) {
         let set_daftar_prodi = [];
         daftarProdi.map((data) => {
            if (data.id_fakultas === id_fakultas) {
               set_daftar_prodi.push(data);
            }
         });
         setNewDaftarProdi(set_daftar_prodi);
      } else {
         setNewDaftarProdi(daftarProdi);
      }
   };

   return (
      <React.Fragment>
         <Row className="d-flex flex-stack flex-wrap mb-5">
            <Col md={2} sm={12} className="align-items-center position-relative my-1 mb-2 mb-md-0">
               <span className="svg-icon svg-icon-1 position-absolute ms-6 mt-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <rect
                        opacity="0.5"
                        x="17.0365"
                        y="15.1223"
                        width="8.15546"
                        height="2"
                        rx="1"
                        transform="rotate(45 17.0365 15.1223)"
                        fill="currentColor"
                     ></rect>
                     <path
                        d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                        fill="currentColor"
                     ></path>
                  </svg>
               </span>
               <Form.Control className="form-control-solid w-250px ps-15" placeholder="Cari peserta KPM..." data-table-search />
            </Col>
            <Col md={10} xs={12} className="justify-content-end">
               <Row>
                  <Col md={3} xs={12}>
                     <Form.Control
                        as="select"
                        disabled={isLoadingDropdownList}
                        value={filter.id_fakultas}
                        onChange={(e) => {
                           filter["id_fakultas"] = e.target.value;
                           setFilter(filter);
                           setApplyFilter(true);
                           handleChangeProdi(e.target.value);
                        }}
                     >
                        <option value="">{isLoadingDropdownList ? "Loading..." : "--fakultas--"}</option>
                        {daftarFakultas.map((data, index) => {
                           return (
                              <option value={data.id_fakultas} key={index}>
                                 {data.nama_fakultas}
                              </option>
                           );
                        })}
                     </Form.Control>
                  </Col>
                  <Col md={3} xs={12}>
                     <Form.Control
                        as="select"
                        disabled={isLoadingDropdownList}
                        value={filter.id_prodi}
                        onChange={(e) => {
                           filter["id_prodi"] = e.target.value;
                           setFilter(filter);
                           setApplyFilter(true);
                        }}
                     >
                        <option value="">{isLoadingDropdownList ? "Loading..." : "--prodi--"}</option>
                        {newDaftarProdi.map((data, index) => {
                           return (
                              <option value={data.id_prodi} key={index}>
                                 {data.nama_prodi}
                              </option>
                           );
                        })}
                     </Form.Control>
                  </Col>
                  <Col md={2} xs={12}>
                     <Form.Control
                        as="select"
                        disabled={isLoadingDropdownList}
                        value={filter.id_jenis_kpm}
                        onChange={(e) => {
                           filter["id_jenis_kpm"] = e.target.value;
                           setFilter(filter);
                           setApplyFilter(true);
                        }}
                     >
                        <option value="">{isLoadingDropdownList ? "Loading..." : "--jenis KPM--"}</option>
                        {daftarJenisKPM.map((data, index) => {
                           return (
                              <option value={data.id} key={index}>
                                 {data.nama}
                              </option>
                           );
                        })}
                     </Form.Control>
                  </Col>
               </Row>
            </Col>
         </Row>
      </React.Fragment>
   );
};
export default DatatableFilter;
