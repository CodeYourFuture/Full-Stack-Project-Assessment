import React, { useContext, useState } from "react";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { VideoContext } from "../contexts/VideoContext";
import axios from "axios";

const apiUrl = "http://localhost:5000";

function SortBy() {
  const { dispatch } = useContext(VideoContext);
  const [state, setState] = useState("");

  function handleSort(sortByValue) {
    setState(sortByValue);
    axios(`${apiUrl}/?order=${sortByValue}`).then((res) =>
      dispatch({ type: "LOAD", payload: res.data })
    );
  }

  return (
    <div className="m-3">
      <FormControl variant="outlined" style={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-outlined-label">SortBy</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state}
          onChange={(e) => handleSort(e.target.value)}
          label="SortBy"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="desc">Rating Desc</MenuItem>
          <MenuItem value="asc">Rating Asc</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SortBy;
