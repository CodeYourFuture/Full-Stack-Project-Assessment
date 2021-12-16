import React from "react";
import { TextField } from "@mui/material";

const FormTextField = ({ id, label, onChange }) => {
  return (
    <TextField
      sx={{ m: 1 }}
      id={id}
      label={label}
      variant="outlined"
      size="small"
      onChange={onChange}
      required
    />
  );
};

export default FormTextField;
