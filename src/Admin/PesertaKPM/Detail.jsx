import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { error_code_http, jekel, notification, post, statusPerkawinan } from "Root/Helpers";
moment.locale("id");

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Buttons = React.lazy(() => import("Root/Buttons"));

const Detail = ({ detailContent, setDetailContent }) => {
   // bool
   const [isLoading, setIsLoading] = useState(true);

   // object
   const [content, setContent] = useState({});

   const clearProps = (e) => {
      e.preventDefault();
      setDetailContent({});
   };

   const getDetailBiodata = (formData = {}) => {
      setIsLoading(true);
      post("/getdetailbiodata", formData)
         .then((res) => {
            const { data } = res;
            setContent(data);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoading(false);
         });
   };

   useEffect(() => {
      if (Object.keys(detailContent).length > 0) {
         getDetailBiodata({
            nim: detailContent.nim,
            tahun_ajaran: detailContent.tahun_ajaran,
            id_semester: detailContent.id_semester,
         });
      }
      return () => {};
   }, [detailContent]);

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading..</div>}>
            <Breadcrumbs
               position={[document.title, `Detail ${document.title}`]}
               button={{
                  label: `Kembali`,
                  size: "sm",
                  variant: "outline-danger btn-active-light-danger",
                  onClick: clearProps,
               }}
            />
         </Suspense>
         <Card>
            <Card.Header className="cursor-pointer">
               <Card.Title className="m-0">
                  <h3 className="fw-bold m-0">Detail Biodata</h3>
               </Card.Title>
               <Suspense fallback={<div>Loading...</div>}>
                  <Buttons
                     label="Cetak Biodata"
                     className="align-self-center"
                     size="sm"
                     onClick={(e) => {
                        e.preventDefault();
                        $("<iframe>").hide().attr("src", `/cetakbiodata/${content.nim}`).appendTo("body");
                     }}
                  />
               </Suspense>
            </Card.Header>
            <Card.Body>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Foto
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">
                        {isLoading ? (
                           "Loading..."
                        ) : (
                           <a href={`https://drive.google.com/file/d/${content.foto}/view`} target="_blank">
                              {content.foto}
                           </a>
                        )}
                     </span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     KRS Aktif
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">
                        {isLoading ? (
                           "Loading..."
                        ) : (
                           <a href={`https://drive.google.com/file/d/${content.krs_aktif}/view`} target="_blank">
                              {content.krs_aktif}
                           </a>
                        )}
                     </span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Jenis KPM
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.nama_jenis_kpm}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Nama
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.nama}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Tempat / Tanggal Lahir
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">
                        {isLoading
                           ? "Loading..."
                           : `${content.tpt_lahir}, ${content.tgl_lahir ? moment(content.tgl_lahir).format("DD MMMM YYYY") : "-"}`}
                     </span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Jenis Kelamin
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : jekel(content.jk)}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Alamat
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.alamat}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Fakultas / Jurusan
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">
                        {isLoading ? "Loading..." : `${content.nama_fakultas} / ${content.nama_prodi}`}
                     </span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Nomor Induk Mahasiswa
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.nim}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     a. Nama Orang Tua
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.ayah_nama}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     b. Pekerjaan Orang Tua
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.pekerjaan_ayah}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     c. Alamat Orang Tua
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.ayah_alamat}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     IPK Transkrip
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.ipk}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Pendidikan Terakhir Sebelum Masuk UIN
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.pendidikan_sebelumnya}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Status Perkawinan
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : statusPerkawinan(content.status_perkawinan)}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Keterampilan Khusus
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.keterampilan_khusus}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Organisasi
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.organisasi}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Nomor Peserta
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.nomor_peserta}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Alamat Lengkap di Banda Aceh
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.alamat_di_banda_aceh}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Telepon / HP
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.telp}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     E-mail
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.email}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Ukuran Baju Jaket
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.ukuran_baju}</span>
                  </Col>
               </Row>
               <Row className="mb-3">
                  <Form.Label column lg={4} xs={12} className="fw-semibold text-muted">
                     Jenis penyakit yang sering dialami
                  </Form.Label>
                  <Col lg={8} xs={12}>
                     <span className="fw-bold fs-6 text-gray-800">{isLoading ? "Loading..." : content.penyakit}</span>
                  </Col>
               </Row>
            </Card.Body>
         </Card>
      </React.Fragment>
   );
};
export default Detail;
