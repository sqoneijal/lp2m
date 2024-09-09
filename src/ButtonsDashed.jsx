import React from "react";
import { Button } from "react-bootstrap";

const ButtonsDashed = ({ label, ...init }) => {
   return (
      <Button type="submit" {...init} className="btn-outline btn-outline-dashed">
         {label}
      </Button>
   );
};
export default ButtonsDashed;
