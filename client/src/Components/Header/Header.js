import React from "react";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <header className="App-header">
      <Box
        sx={{
          height: 220,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3" component="h3">
          YouTube Saver
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
