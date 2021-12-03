import React from "react";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <footer style={{ textAlign: "center", paddingTop: 40, paddingBottom: 10 }}>
      <Typography sx={{ fontWeight: "light" }} variant="body1" component="div">
        Final Assessment Designs &copy;
      </Typography>
    </footer>
  );
};

export default Footer;
