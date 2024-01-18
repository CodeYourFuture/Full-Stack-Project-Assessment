import { AppBar, Box } from "@mui/material";
import Search from "./Search";
import Links from "./Links";
import ToggleBtn from "./ToggleBtn";

const Header = () => {
  return (
    <AppBar
      sx={{
        background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
      }}
    >
      <Box
        flexDirection={{ xs: "column", md: "row" }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pl: 3,
          py: 2,
          gap: 1,
        }}
      >
        <Links />
        <ToggleBtn />
        <Search />
      </Box>
    </AppBar>
  );
};

export default Header;
