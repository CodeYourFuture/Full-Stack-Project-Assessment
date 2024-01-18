import { MenuItem, Typography, Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Links = () => {
  const { setVideos, setIsLoading, setIsSearching, isDirecting } =
    useContext(AppContext);

  const clickHandler = () => {
    const order = !isDirecting ? "desc" : "asc";
    fetch(`https://video-assessment.onrender.com/api/?order=${order}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(true);
        setVideos(data.data);
        setIsSearching(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box sx={{ display: "flex", color: "#262624" }}>
      <MenuItem component={Link} to="/" onClick={clickHandler}>
        <Typography fontWeight="bolder">Video Hub</Typography>
      </MenuItem>
      <MenuItem component={Link} to="/add" fontWeight="bolder">
        <Typography fontWeight="bolder">Add Video</Typography>
      </MenuItem>
    </Box>
  );
};

export default Links;
