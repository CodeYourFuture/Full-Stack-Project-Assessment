import React from "react";
import { TextField } from "@mui/material";

const SearchBox = ({ setSearchTerm }) => {
  return (
    <TextField
      sx={{ m: 1, p: 1 }}
      id="search"
      label="Search"
      variant="outlined"
      size="small"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export default SearchBox;
