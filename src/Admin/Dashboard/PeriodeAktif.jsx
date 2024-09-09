import React, { useEffect, useState } from "react";
import { Col, Card } from "react-bootstrap";
import { periode } from "Root/Helpers";

const PeriodeAktif = ({ isLoading, jumlahPesertaKPM }) => {
   return (
      <React.Fragment>
         <Col md={3} xs={12}>
            <Card className="card-flush mb-5 mb-xl-10">
               <Card.Header className="card-header pt-5">
                  <Card.Title className="d-flex flex-column">
                     <div className="d-flex align-items-center">
                        <span className="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">
                           {periode(content.periode.tahun_ajaran, content.periode.id_semester)}
                        </span>
                     </div>
                     <span className="text-gray-400 pt-1 fw-semibold fs-6">Periode Aktif</span>
                  </Card.Title>
               </Card.Header>
               <Card.Body className="pt-2 pb-4 d-flex flex-wrap align-items-center">
                  <div className="d-flex flex-column content-justify-center flex-row-fluid">
                     {!isLoading &&
                        jumlahPesertaKPM.map((data, index) => {
                           return (
                              <div className="d-flex fw-semibold align-items-center" key={index}>
                                 <div className="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
                                 <div className="text-gray-500 flex-grow-1 me-4">{data.nama}</div>
                                 <div className="fw-bolder text-gray-700 text-xxl-end">{data.jumlah} peserta</div>
                              </div>
                           );
                        })}
                  </div>
               </Card.Body>
            </Card>
         </Col>
      </React.Fragment>
   );
};
export default PeriodeAktif;
