import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import { grey } from "@mui/material/colors";

function Header() {
  return (
    <AppBar
      position="static"
      color="error"
      sx={{ height: { xs: "80px", md: "100px" } }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "first baseline",
            mt: 2,
          }}
        >
          <SmartDisplayIcon
            sx={{
              fontSize: { xs: 30, md: 55 },
              display: { md: "flex" },
              alignSelf: "center",
              mr: { xs: 1, md: 2 },
            }}
          />
          <Typography
            variant="h5"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { md: "flex" },
              alignSelf: "center",
              fontSize: { xs: 15, md: 30 },
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
            }}
          >
            Videorary
          </Typography>
          <Typography
            variant="body1"
            wrap="true"
            sx={{
              pt: { xs: 0.5, md: 1 },
              display: { md: "flex" },
              alignSelf: "center",
              fontSize: { xs: 10, md: 18 },
              fontWeight: 500,
              letterSpacing: ".2rem",
              color: grey[300],
            }}
          >
            Your Favourite Videos Library
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
