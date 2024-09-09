import React, { useEffect } from "react";
import { Container, Dropdown } from "react-bootstrap";

const Header = ({ nav, setSubMenu }) => {
   useEffect(() => {
      let filter_dropdown = document.querySelector("#dropdown");
      if (filter_dropdown) filter_dropdown.classList.remove("dropdown-toggle");
      return () => {};
   }, []);

   return (
      <React.Fragment>
         <div className="header align-items-stretch">
            <Container fluid={true} className="d-flex align-items-stretch justify-content-between">
               <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0 w-lg-225px me-5">
                  <div className="btn btn-icon btn-active-icon-primary ms-n2 me-2 d-flex d-lg-none">
                     <span className="svg-icon svg-icon-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor"></path>
                           <path
                              opacity="0.3"
                              d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                              fill="currentColor"
                           ></path>
                        </svg>
                     </span>
                  </div>
                  <a href="/">
                     <img
                        alt="Logo"
                        src="https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png"
                        className="d-none d-lg-inline h-30px theme-light-show"
                        loading="lazy"
                     />
                     <img
                        alt="Logo"
                        src="https://siakad.ar-raniry.ac.id/media/1494223385logo_uin_arraniry.png"
                        className="d-lg-none h-25px"
                        loading="lazy"
                     />
                  </a>
               </div>
               <div className="d-flex align-items-stretch justify-content-between flex-lg-grow-1">
                  <div className="d-flex align-items-stretch">
                     <div className="header-menu align-items-stretch">
                        <div className="menu menu-lg-rounded menu-column menu-lg-row menu-state-bg menu-title-gray-700 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-400 fw-bold my-5 my-lg-0 align-items-stretch">
                           {nav.map((data, index) => {
                              return (
                                 <div className="menu-item me-lg-1" key={index}>
                                    <a
                                       href={data.url}
                                       className={`menu-link py-3 ${segment[2] === data.active ? "active" : ""}`}
                                       onClick={(e) => {
                                          if (data.sub) {
                                             e.preventDefault();
                                             setSubMenu(data.child);
                                          }
                                       }}
                                    >
                                       <span className="menu-title">{data.label}</span>
                                    </a>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
                  <div className="d-flex align-items-stretch flex-shrink-0">
                     <div className="d-flex align-items-center ms-lg-5">
                        <Dropdown className="btn btn-active-light d-flex align-items-center bg-hover-light py-2 px-2 px-md-3">
                           <Dropdown.Toggle
                              id="dropdown"
                              as="div"
                              bsPrefix="d-none d-md-flex flex-column align-items-end justify-content-center me-2"
                           >
                              <span className="text-muted fs-7 fw-semibold lh-1 mb-2">Hello</span>
                              <span className="text-dark fs-base fw-bold lh-1">{user.nama}</span>
                           </Dropdown.Toggle>
                           <div className="symbol symbol-50px me-5">
                              <img src="/assets/images/avatar-placeholder.png" alt="image" loading="lazy" />
                           </div>
                           <Dropdown.Menu bsPrefix="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px">
                              <Dropdown.Item bsPrefix="menu-item px-5" as="div">
                                 <div className="menu-content d-flex align-items-center px-3">
                                    <div className="symbol symbol-50px me-5">
                                       <img src="/assets/images/avatar-placeholder.png" alt="image" loading="lazy" />
                                    </div>
                                    <div className="d-flex flex-column">
                                       <div className="fw-bolder d-flex align-items-center fs-5">{user.nama}</div>
                                       <a className="fw-bold text-muted text-hover-primary fs-7">{user.username}</a>
                                    </div>
                                 </div>
                              </Dropdown.Item>
                              <Dropdown.Divider bsPrefix="separator my-2" as="div" />
                              <Dropdown.Item bsPrefix="menu-item px-5" as="div">
                                 <a href="/login/logout" className="menu-link px-5">
                                    Logout
                                 </a>
                              </Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown>
                     </div>
                  </div>
               </div>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Header;
