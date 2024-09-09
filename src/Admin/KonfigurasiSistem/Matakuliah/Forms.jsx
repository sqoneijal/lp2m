import React, { Suspense, useState } from "react";
import { Card, Row, Col, Form, Table } from "react-bootstrap";
import { post, notification, error_code_http } from "Root/Helpers";

const Buttons = React.lazy(() => import("Root/Buttons"));
const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Info = React.lazy(() => import("./Info"));

const Forms = ({ setOpenForms, pageType }) => {
   // bool
   const [isLoading, setIsLoading] = useState(false);
   const [isSubmit, setIsSubmit] = useState(false);

   // array
   const [selected_kode_mk, setSelected_kode_mk] = useState([]);
   const [listContent, setListContent] = useState([]);

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         selected_kode_mk: JSON.stringify(selected_kode_mk),
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
            clearProps(e);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   const handleSearch = (query) => {
      if (query.length >= 3) {
         const formData = {
            query: query,
         };

         setIsLoading(true);
         post("/carimatakuliah", formData)
            .then((res) => {
               const { data } = res;
               setListContent(data);
            })
            .catch((e) => {
               notification(false, error_code_http(e.response.status));
            })
            .then(() => {
               setIsLoading(false);
            });
      }
   };

   const clearProps = (e) => {
      e.preventDefault();
      setOpenForms(false);
   };

   const handleSelected = (value) => {
      if (selected_kode_mk.includes(value)) {
         let set_selected = [];
         selected_kode_mk.map((data) => {
            if (data !== value) {
               set_selected.push(data);
            }
         });
         setSelected_kode_mk(set_selected);
      } else {
         setSelected_kode_mk((prev) => prev.concat(value));
      }
   };

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading..</div>}>
            <Breadcrumbs
               position={["Konfigurasi Sistem", document.title, `${pageType === "insert" ? "Tambah" : "Perbaharui"} ${document.title}`]}
               button={{
                  label: `Batal ${pageType === "insert" ? "Tambah" : "Perbaharui"} ${document.title}`,
                  size: "sm",
                  variant: "outline-danger btn-active-light-danger",
                  onClick: clearProps,
               }}
            />
            <Info />
         </Suspense>
         <Card>
            <Card.Body className="p-5">
               <Row className="mb-3">
                  <Col xs={12}>
                     <div className="form-floating">
                        <Form.Control
                           placeholder="Ketikkan kode matakuliah atau nama matakuliah disini..."
                           onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Form.Label>Ketikkan kode matakuliah atau nama matakuliah disini...</Form.Label>
                     </div>
                  </Col>
               </Row>
               {(() => {
                  if (selected_kode_mk.length > 0) {
                     return (
                        <Suspense fallback={<div>Loading...</div>}>
                           <Buttons label={isSubmit ? "Loading..." : `Simpan Data ${document.title}`} size="sm" onClick={isSubmit ? null : submit} />
                        </Suspense>
                     );
                  }
               })()}
               <Table responsive className="align-middle table-row-dashed fs-6 mt-10">
                  <thead>
                     <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th style={{ width: "5%" }} />
                        <th className="text-center">kode matakuliah</th>
                        <th>nama matakuliah</th>
                        <th className="text-center">sks matakuliah</th>
                     </tr>
                  </thead>
                  <tbody className="text-gray-600 fw-semibold">
                     {listContent.length > 0 && !isLoading ? (
                        listContent.map((data, index) => {
                           return (
                              <tr
                                 key={index}
                                 className={`table-hover-success ${selected_kode_mk.includes(data.kode_mk) ? "active" : ""}`}
                                 onClick={(e) => {
                                    e.preventDefault();
                                    handleSelected(data.kode_mk);
                                 }}
                              >
                                 <td className="text-center">
                                    <div className="form-check form-check-sm form-check-custom">
                                       <input
                                          className="form-check-input"
                                          type="checkbox"
                                          value={data.kode_mk}
                                          onChange={(e) => handleSelected(e.target.value)}
                                          checked={selected_kode_mk.includes(data.kode_mk) ? true : false}
                                       />
                                    </div>
                                 </td>
                                 <td className="text-center">{data.kode_mk}</td>
                                 <td>{data.nama_matakuliah}</td>
                                 <td className="text-center">{data.sks_matakuliah}</td>
                              </tr>
                           );
                        })
                     ) : (
                        <tr>
                           <td colSpan={4}>
                              {isLoading ? (
                                 "Loading..."
                              ) : (
                                 <div className="d-flex flex-column flex-center">
                                    <img src="/assets/images/5.png" className="mw-400px" loading="lazy" />
                                    <div className="fs-1 fw-bolder text-dark mb-4">Tidak ada item yang ditemukan.</div>
                                    <div className="fs-6">Mulai buat item baru!</div>
                                 </div>
                              )}
                           </td>
                        </tr>
                     )}
                  </tbody>
               </Table>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Forms;
