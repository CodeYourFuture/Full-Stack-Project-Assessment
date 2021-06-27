import React, { useContext } from "react";
import { Search } from "@material-ui/icons";
import { VideoContext } from "../contexts/VideoContext";

function SearchVideo() {
  const { state, dispatch } = useContext(VideoContext);

  return (
    <div className="input-group input-group-sm mb-3">
      <input
        placeholder="Search"
        type="text"
        value={state.searchText}
        className="form-control"
        id="basic-url"
        aria-describedby="basic-addon3"
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />
      <span className="input-group-text" id="basic-addon3">
        <Search />
      </span>
    </div>
  );
}

export default SearchVideo;
