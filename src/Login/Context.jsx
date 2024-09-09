import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";

const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   return (
      <React.Fragment>
         <div className="d-flex flex-column flex-column-fluid flex-lg-row">
            <div className="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
               <div className="d-flex flex-center flex-lg-start flex-column">
                  <a href="/" className="mb-7">
                     <img alt="Logo" src="https://uin.ar-raniry.ac.id/assets/img/7b186572c6e368277455f8954d2ffe2d1.png" loading="lazy" />
                  </a>
                  <h2 className="text-white fw-normal m-0">Lembaga Penelitian dan Pengabdian Masyarakat (LP2M)</h2>
               </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
               <Forms />
            </Suspense>
         </div>
      </React.Fragment>
   );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Context />);
