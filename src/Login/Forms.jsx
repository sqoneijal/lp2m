import React, { Suspense, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { post, notification, error_code_http, is_invalid, msg_response } from "Root/Helpers";

const Buttons = React.lazy(() => import("Root/Buttons"));

const Forms = () => {
   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});

   // string
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         username: username,
         password: password,
      };

      setIsSubmit(true);
      post("/submit", formData)
         .then((res) => {
            const { data } = res;
            setErrors(data.errors);

            if (data.status) open("/admin/dashboard", "_parent");
            else notification(data.status, data.msg_response);
         })
         .catch((e) => {
            notification(false, error_code_http(e.response.status));
         })
         .then(() => {
            setIsSubmit(false);
         });
   };

   return (
      <React.Fragment>
         <div className="d-flex flex-center w-lg-50 p-10">
            <Card className="rounded-3 w-md-550px">
               <Card.Body className="p-10 p-lg-20">
                  <Form className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework" autoComplete="off" onSubmit={isSubmit ? null : submit}>
                     <div className="text-center mb-11">
                        <h1 className="text-dark fw-bolder mb-3">Login</h1>
                        <div className="text-dark fw-bolder mb-3">Silahkan isi form berikut ini!</div>
                     </div>
                     <div className="fv-row mb-8 fv-plugins-icon-container">
                        <Form.Control
                           className="bg-transparent"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           isInvalid={is_invalid(errors.username)}
                           autoFocus={true}
                        />
                        {msg_response(errors.username)}
                     </div>
                     <div className="fv-row mb-8 fv-plugins-icon-container">
                        <Form.Control
                           className="bg-transparent"
                           placeholder="Password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           isInvalid={is_invalid(errors.password)}
                        />
                        {msg_response(errors.password)}
                     </div>
                     <div className="d-grid mb-10">
                        <Suspense fallback={<div>Loading...</div>}>
                           <Buttons label={isSubmit ? "Loading..." : "Login"} />
                        </Suspense>
                     </div>
                  </Form>
               </Card.Body>
            </Card>
         </div>
      </React.Fragment>
   );
};
export default Forms;
