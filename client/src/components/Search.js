import { useRef } from "react";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
 
 
const Search = ({ handelSearch }) => {
  const keyword = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") { 
      handelSearch(keyword.current.value);
    }
  };

  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        ref={keyword}
        placeholder="Search Here"
      />

      <Button
        onClick={() => handelSearch(keyword.current.value)}
        variant="outlined"
        startIcon={<SearchIcon />}
      >
        Search Video
      </Button>
    </div>
  );
};

export default Search;
