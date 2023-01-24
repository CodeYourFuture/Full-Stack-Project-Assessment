import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function OrderBtns({ order, handleChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" color="secondary">
        Order
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={order}
        onChange={handleChange}
      >
        <FormControlLabel value="desc" control={<Radio />} label="Desc" />
        <FormControlLabel value="asc" control={<Radio />} label="Asc" />
      </RadioGroup>
    </FormControl>
  );
}

export default OrderBtns;
