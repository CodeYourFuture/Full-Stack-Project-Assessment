import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddVideo from "../AddVideo/AddVideo";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";

const AddVideoDrawer = ({ videos, setVideos }) => {
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (open) => {
    setToggle(open);
  };

  const form = () => (
    <Box role="addVideoForm">
      <AddVideo
        toggleDrawer={toggleDrawer}
        videos={videos}
        setVideos={setVideos}
      />
    </Box>
  );

  return (
    <React.Fragment>
      <Tooltip title="Upload Video" placement="top" arrow>
        <Box
          sx={{
            margin: 0,
            top: "auto",
            right: 20,
            bottom: 20,
            left: "auto",
            position: "fixed",
          }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => toggleDrawer(true)}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Tooltip>
      <Drawer open={toggle} onClose={() => toggleDrawer(false)}>
        {form()}
      </Drawer>
    </React.Fragment>
  );
};

export default AddVideoDrawer;
