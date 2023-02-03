import React from "react";
import { Typography } from "@mui/material";

const MainTitle = () => {
    return (
        <Typography
          fontSize={{
            lg: 60,
            md: 55,
            sm: 55,
            xs: 40,
          }}
          variant="h1"
          gutterBottom
        >
          Video Recommendation
        </Typography>
    );
}

export default MainTitle;