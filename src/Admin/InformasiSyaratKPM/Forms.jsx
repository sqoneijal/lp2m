import React, { useRef, useState, useEffect } from "react";
import { get, post, notification, error_code_http } from "Root/Helpers";
import { decode } from "html-entities";

const BundledEditor = React.lazy(() => import("Admin/BundledEditor"));

const Forms = () => {
   const editorRef = useRef(null);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // string
   const [content, setContent] = useState("");

   const getContent = () => {
      get("/getcontent")
         .then((res) => {
            const { data } = res;
            setContent(decode(data.content));
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         });
   };

   useEffect(() => {
      getContent();
      return () => {};
   }, []);

   const submit = () => {
      const formData = {
         content: editorRef.current.getContent(),
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            notification(data.status, data.msg_response);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   return (
      <BundledEditor
         initialValue={content}
         onInit={(evt, editor) => (editorRef.current = editor)}
         init={{
            height: 650,
            setup: (editor) => {
               editor.ui.registry.addButton("customSaveButton", {
                  text: isSubmit ? "Loading..." : "Simpan",
                  icon: "save",
                  onAction: () => {
                     submit();
                  },
               });
            },
         }}
      />
   );
};
export default Forms;
