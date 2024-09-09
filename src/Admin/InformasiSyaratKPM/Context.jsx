import React from "react";

const Breadcrumbs = React.lazy(() => import("Admin/Breadcrumbs"));
const Forms = React.lazy(() => import("./Forms"));

const Context = () => {
   return (
      <React.Fragment>
         <Breadcrumbs />
         <Forms />
      </React.Fragment>
   );
};
export default Context;
