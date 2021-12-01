import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddVideo from "../AddVideo/AddVideo";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const AddVideoDrawer = ({ videos, setVideos }) => {
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (open) => {
    setToggle(open);
  };

  const list = () => (
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
      <Box style={style}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => toggleDrawer(true)}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Drawer open={toggle} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default AddVideoDrawer;
