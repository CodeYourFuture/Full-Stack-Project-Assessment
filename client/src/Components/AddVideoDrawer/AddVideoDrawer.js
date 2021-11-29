import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AddVideo from "../AddVideo/AddVideo";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const AddVideoDrawer = () => {
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (open) => {
    setToggle(open);
  };

  const list = () => (
    <Box role="addVideoForm">
      <AddVideo toggleDrawer={toggleDrawer} />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Box sx={{ m: 1 }}>
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
    </div>
  );
};

export default AddVideoDrawer;
