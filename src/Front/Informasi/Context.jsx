import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { get, notification, error_code_http } from "Root/Helpers";
import { Container } from "react-bootstrap";
import { decode } from "html-entities";
import HTMLReactParser from "html-react-parser";

const Detail = React.lazy(() => import("./Detail"));

const Context = () => {
   const { id } = useParams();

   // bool
   const [isLoadingContent, setIsLoadingContent] = useState(true);

   // string
   const [judul, setJudul] = useState("");
   const [content, setContent] = useState("");

   const propsDetail = { isLoadingContent, judul, content };

   const getDetailInformasi = (id) => {
      setIsLoadingContent(true);
      get("/detail")
         .then((res) => {
            const { data } = res;
            document.title = data.judul;
            setJudul(data.judul);
            setContent(HTMLReactParser(decode(`${data.content}`)));
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsLoadingContent(false);
         });
   };

   useEffect(() => {
      id && getDetailInformasi(id);
      return () => {};
   }, [id]);

   return (
      <React.Fragment>
         <div className="mb-20 z-index-2">
            <Container fluid={false}>
               <Suspense fallback={<div>Loading...</div>}>
                  <Detail {...propsDetail} />
               </Suspense>
            </Container>
         </div>
      </React.Fragment>
   );
};
export default Context;
