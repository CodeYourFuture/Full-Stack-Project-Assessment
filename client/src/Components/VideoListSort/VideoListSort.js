import React from "react";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Tooltip } from "@mui/material";

const VideoListSort = ({ videoSortOrder, setVideoSortOrder }) => {
  const handleVideoSort = () => {
    videoSortOrder === "asc"
      ? setVideoSortOrder("desc")
      : setVideoSortOrder("asc");
  };

  return (
    <Tooltip title="Sort videos" placement="top" arrow>
      <Button
        sx={{ my: 2, mx: 3, lineHeight: "normal" }}
        onClick={handleVideoSort}
        type="onclick"
        variant="contained"
        size="large"
        aria-label="sort"
        endIcon={
          <FilterListIcon
            style={
              videoSortOrder === "asc"
                ? { transform: "rotate(0deg)" }
                : { transform: "rotate(180deg)" }
            }
          />
        }
      >
        Sort
      </Button>
    </Tooltip>
  );
};

export default VideoListSort;
