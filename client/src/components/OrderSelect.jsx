import React from "react";
import { Box, FormControl, NativeSelect } from "@mui/material";

const OrderSelect = ({ handleOnChangeOrder }) => {
  return (
    <Box sx={{ ml: 5, mr: 5, maxWidth: 85, backgroundColor: "#fff" }}>
      <FormControl fullWidth onChange={handleOnChangeOrder}>
        <NativeSelect
          defaultValue={""}
          inputProps={{
            name: "order",
            id: "orderSelect",
          }}
        >
          <option value="">None↓↑</option>
          <option value="desc">Desc ↓</option>
          <option value="asc">Asc ↑</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default OrderSelect;
