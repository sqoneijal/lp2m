import React from "react";
import { Each } from "Root/Each";

const ButtonsDashed = React.lazy(() => import("Root/ButtonsDashed"));

const Breadcrumbs = ({ position = [], button = {} }) => {
   return (
      <div className="toolbar d-flex flex-stack flex-wrap mb-5 mb-lg-7">
         <div className="page-title d-flex flex-column py-1">
            <h1 className="d-flex align-items-center my-1">
               <span className="text-dark fw-bold fs-1">{document.title}</span>
            </h1>
            {(() => {
               if (position.length > 0) {
                  return (
                     <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-1">
                        <Each
                           of={position}
                           render={(data, index) => (
                              <React.Fragment>
                                 <li className="breadcrumb-item text-muted text-hover-primary">{data}</li>
                                 {(() => {
                                    if (index + 1 !== position.length) {
                                       return (
                                          <li className="breadcrumb-item">
                                             <span className="bullet bg-gray-200 w-5px h-2px" />
                                          </li>
                                       );
                                    }
                                 })()}
                              </React.Fragment>
                           )}
                        />
                     </ul>
                  );
               }
            })()}
         </div>
         {(() => {
            if (Object.keys(button).length > 0) {
               return (
                  <div className="d-flex align-items-center py-1">
                     <ButtonsDashed label={button.label} {...button} />
                  </div>
               );
            }
         })()}
      </div>
   );
};
export default Breadcrumbs;
