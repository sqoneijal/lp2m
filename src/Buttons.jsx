import React from "react";
import { Button } from "react-bootstrap";

const Buttons = ({ label, ...init }) => {
   return (
      <React.Fragment>
         <Button type="submit" {...init}>
            {label}
         </Button>
      </React.Fragment>
   );
};
export default Buttons;
