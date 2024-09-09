import React from "react";
import { Row, Table } from "react-bootstrap";
import { periode } from "Root/Helpers";
import moment from "moment";
moment.locale("id");

const HasilPengecekanStatus = ({ listContent }) => {
   return (
      <React.Fragment>
         <Row className="w-100 gy-10 mb-md-10">
            <Table className="align-middle table-row-dashed fs-6">
               <thead>
                  <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0 text-center">
                     <th>jenis kpm yang di daftar</th>
                     <th>tanggal daftar</th>
                     <th>periode pendaftaran</th>
                  </tr>
               </thead>
               <tbody className="text-gray-600 fw-semibold">
                  {listContent.map((data, index) => {
                     return (
                        <tr key={index} className="text-center">
                           <td>{data.nama_jenis_kpm}</td>
                           <td>{moment(data.uploaded).format("dddd, DD MMMM YYYY")}</td>
                           <td>{periode(data.tahun_ajaran, data.id_semester)}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </Table>
         </Row>
      </React.Fragment>
   );
};
export default HasilPengecekanStatus;
