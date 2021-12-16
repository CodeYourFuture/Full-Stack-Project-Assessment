import React from "react";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Tooltip } from "@mui/material";

const VideoListSort = ({ videoSortOrder, setVideoSortOrder }) => {
  const videoSortHandler = () => {
    videoSortOrder === "asc"
      ? setVideoSortOrder("desc")
      : setVideoSortOrder("asc");
  };

  return (
    <Tooltip title="Sort videos" placement="top" arrow>
      <Button
        sx={{ my: 2, mx: 3, lineHeight: "normal" }}
        onClick={videoSortHandler}
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
        Sort by votes
      </Button>
    </Tooltip>
  );
};

export default VideoListSort;
