import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../App";

const ToggleBtn = () => {
  const { isDirecting, setIsDirecting } = useContext(AppContext);

  const directionHandler = () => {
    setIsDirecting(!isDirecting);
  };

  return (
    <ToggleButtonGroup
      color="standard"
      value={!isDirecting ? "desc" : "asc"}
      exclusive
      onChange={directionHandler}
      aria-label="Platform"
    >
      <ToggleButton value="asc">Ascending</ToggleButton>
      <ToggleButton value="desc">Descending</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleBtn;
