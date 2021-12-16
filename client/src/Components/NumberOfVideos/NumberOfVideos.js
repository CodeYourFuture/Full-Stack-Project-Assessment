import React from "react";
import Typography from "@mui/material/Typography";

const NumberOfVideos = ({ videos }) => {
  return (
    <Typography
      sx={{
        width: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      component="div"
      aria-label="saved video count"
    >
      {videos.length} videos saved
    </Typography>
  );
};

export default NumberOfVideos;
