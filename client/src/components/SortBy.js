import React, { useContext } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { VideoContext } from "../contexts/VideoContext";

function SortBy() {
  const { state, dispatch } = useContext(VideoContext);

  return (
    <div className="m-3">
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-outlined-label">SortBy</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state.sortStatus}
          onChange={(e) =>
            dispatch({ type: "SORTBY", payload: e.target.value })
          }
          label="SortBy"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="RATINGDESC">Rating Desc</MenuItem>
          <MenuItem value="RATINGASC">Rating Asc</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortBy;
