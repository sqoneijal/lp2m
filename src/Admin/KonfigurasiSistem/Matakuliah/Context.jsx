import React, { Suspense, useState } from "react";

const Forms = React.lazy(() => import("./Forms"));
const Lists = React.lazy(() => import("./Lists"));

const Context = () => {
   // bool
   const [openForms, setOpenForms] = useState(false);

   const propsLists = { setOpenForms };
   const propsForms = { setOpenForms, pageType: "insert" };

   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading...</div>}>
            {(() => {
               if (openForms) {
                  return <Forms {...propsForms} />;
               } else {
                  return <Lists {...propsLists} />;
               }
            })()}
         </Suspense>
      </React.Fragment>
   );
};
export default Context;
