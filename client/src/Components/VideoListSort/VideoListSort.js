import React from "react";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";

const VideoListSort = ({ videoSortOrder, setVideoSortOrder }) => {
  const handleVideoSort = () => {
    videoSortOrder === "asc"
      ? setVideoSortOrder("desc")
      : setVideoSortOrder("asc");
  };

  return (
    <Button
      sx={{ my: 2, mx: 3 }}
      onClick={handleVideoSort}
      type="onclick"
      variant="contained"
      endIcon={<FilterListIcon />}
    >
      Sort
    </Button>
  );
};

export default VideoListSort;
