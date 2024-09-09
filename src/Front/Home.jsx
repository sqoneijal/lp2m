import React, { Suspense } from "react";

const Informasi = React.lazy(() => import("Front/Home/Informasi"));

const Home = () => {
   return (
      <React.Fragment>
         <Suspense fallback={<div>Loading...</div>}>
            <Informasi />
         </Suspense>
      </React.Fragment>
   );
};
export default Home;
