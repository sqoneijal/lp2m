import axios from "axios";
import React from "react";
import { Form } from "react-bootstrap";

export const post = async (url, form = [], config = {}) => {
   let formData = new FormData();

   if (typeof user !== "undefined") {
      try {
         formData.append("user_modified", jwtDecode(user).username);
      } catch (e) {
         formData.append("user_modified", user.username);
      }
   }

   Object.keys(form).map((data) => {
      formData.append(data, form[data]);
   });

   axios.create();
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return await axios.post(`${location.href}${url}`, formData, config);
};

export const get = async (url) => {
   axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
   return await axios.get(`${location.href}${url}`);
};

export const notification = (status, msg_response) => {
   Swal.fire({
      text: msg_response,
      icon: status ? "success" : "error",
      buttonsStyling: false,
      confirmButtonText: "Ok, dimengerti!",
      customClass: {
         confirmButton: "btn btn-primary btn-sm",
      },
   });
};

export const error_code_http = (code) => {
   const config = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      122: "Request-URI too long",
      127: "Network Authentication Required",
      150: "Continue",
      151: "Switching Protocols",
      152: "Processing",
      153: "Early Hints",
      158: "Request-URI too long",
      159: "Network Authentication Required",
      180: "Continue",
      181: "Switching Protocols",
      182: "Processing",
      183: "Early Hints",
      188: "Request-URI too long",
      189: "Network Authentication Required",
      199: "Network Authentication Required",
      200: "OK",
      201: "Created",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      250: "Continue",
      251: "Switching Protocols",
      252: "Processing",
      253: "Early Hints",
      258: "Request-URI too long",
      259: "Network Authentication Required",
      299: "Network Authentication Required",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      310: "Too many Redirect",
      399: "Client Closed Request",
      300: "Multiple Choices",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
      599: "Network Authentication Required",
   };

   if (typeof config[code] !== "undefined") {
      return config[code];
   } else {
      return "Terjadi sesuatu kesalahan";
   }
};

export const is_invalid = (key) => {
   return key ? true : false;
};

export const msg_response = (msg) => {
   return msg ? <Form.Control.Feedback type="invalid">{msg}</Form.Control.Feedback> : "";
};

const hapus = (url, id) => {
   const formData = {
      id: id,
   };

   return post(url, formData).catch((e) => {
      notification(false, e.code, e.message);
   });
};

export const confirmDelete = ({ ...content }) => {
   return Swal.fire({
      text: "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Iya, hapus!",
      cancelButtonText: "Tidak, batal",
      customClass: {
         confirmButton: "btn fw-bold btn-danger",
         cancelButton: "btn fw-bold btn-active-light-primary",
      },
   }).then((res) => {
      if (res.isConfirmed) {
         return hapus(content.url, content.id);
      }
   });
};

let dt;
const DatatableServerSide = ({ ...content }) => {
   let renderColumnDefs = [
      {
         targets: -1,
         data: null,
         orderable: false,
         className: "text-end",
         render: () => {
            let button_render = "";
            if (content.show_edit_button)
               button_render +=
                  '<a href="#" id="edit" class="btn btn-active-icon-warning btn-active-text-warning btn-sm p-0 m-0"><i class="fas fa-solid fa-pen"></i></a>';
            if (content.show_delete_button)
               button_render +=
                  '<a href="#" id="delete" class="btn btn-active-icon-danger btn-active-text-danger btn-sm p-0 m-0"><i class="fas fa-solid fa-trash"></i></a>';
            if (content.custom_button) button_render += content.custom_button;

            return button_render;
         },
      },
   ];

   dt = $("#datatable").DataTable({
      responsive: true,
      processing: true,
      serverSide: true,
      ajax: {
         url: `${location.href}${content.url}`,
         type: "post",
         data: content.where,
         error: (xhr) => {
            if (xhr) notification(false, xhr.statusText);
         },
      },
      columns: content.columns,
      columnDefs: content.columnDefs ? renderColumnDefs : [],
      language: {
         processing: "<div><div></div><div></div><div></div><div></div></div>",
         emptyTable:
            '<div class="d-flex flex-column flex-center">' +
            '<img src="/assets/images/5.png" class="mw-400px">' +
            '<div class="fs-1 fw-bolder text-dark mb-4">Tidak ada item yang ditemukan.</div>' +
            '<div class="fs-6">Mulai buat item baru!</div>' +
            "</div>",
         info: "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
         infoEmpty: "Menampilkan 0 sampai 0 dari 0 entri",
         infoFiltered: "(disaring dari _MAX_ entri keseluruhan)",
         zeroRecords: "Tidak ditemukan data yang sesuai",
         thousands: ".",
         infoThousands: ".",
      },
      initComplete: (settings, json) => {
         if (json.recordsFiltered <= 10) {
            $("div.dataTables_length").hide();
            $("div.dataTables_info").hide();
            $("div.dataTables_paginate").hide();
         }
      },
      drawCallback: (data) => {
         if (data.json.recordsFiltered > 10) {
            $("div.dataTables_length").show();
            $("div.dataTables_info").show();
            $("div.dataTables_paginate").show();
         }
         handleSearchDatatable();
      },
      createdRow: content.createdRow,
   });
};

export const handleFilterDatatable = (url, content = {}) => {
   dt.ajax.url(`${window.location.href}${url}?${serialize(content)}`).load();
};

const handleSearchDatatable = () => {
   const filterSearch = document.querySelector("[data-table-search]");
   if (filterSearch) {
      filterSearch.addEventListener("keyup", function (e) {
         dt.search(e.target.value).draw();
      });
   }
};

export const initDatatable = ({ ...content }) => {
   return {
      reload: () => {
         dt.ajax.reload(null, false);
      },
      init: () => {
         DatatableServerSide(content);
      },
   };
};

export const serialize = (obj) => {
   let str = [];
   for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
   }
   return str.join("&");
};

export const periode = (tahun_ajaran, id_semester) => {
   const array = {
      1: "Ganjil",
      2: "Genap",
      3: "Pendek/Antara",
   };

   if (typeof array[id_semester] !== "undefined") return `${tahun_ajaran}/${parseInt(tahun_ajaran) + 1} ${array[id_semester]}`;
};

export const is_active_periode = (key) => {
   const array = {
      1: `<span class="badge badge-success">Aktif</span>`,
      0: `<span class="badge badge-danger">Non Aktif</span>`,
   };
   return array[key];
};

export const jekel = (key) => {
   const array = {
      L: "Laki - Laki",
      P: "Perempuan",
   };
   if (typeof array[key] !== "undefined") return array[key];
   else return "-";
};

export const statusPerkawinan = (key) => {
   const array = {
      1: "Sudah Menikah",
      2: "Janda",
      3: "Duda",
      4: "Belum Menikah",
   };
   if (typeof array[key] !== "undefined") return array[key];
   else return "-";
};

export const render_keterampilan_khusus = (content) => {
   if (content) {
      let split_content = content.split(",");
      if (split_content.length > 0) {
         let render_keterampilan = [];
         render_keterampilan.push(
            <ol key="keterampilan" className="m-0" style={{ paddingLeft: 18 }}>
               {split_content.map((data, index) => {
                  return <li key={index}>{data}</li>;
               })}
            </ol>
         );
         return render_keterampilan;
      }
   } else {
      return "-";
   }
   return "-";
};

export const objLength = (content = {}) => {
   return Object.keys(content).length > 0;
};
