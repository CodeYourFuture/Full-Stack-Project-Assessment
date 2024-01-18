import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { AppContext } from "../App";

const Search = () => {
  const [title, setTitle] = useState("");
  const { setIsLoading, setSearch, setIsSearching, isDirecting } =
    useContext(AppContext);

  const inputHandler = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("search-btn").click();
    } else {
      setTitle(event.target.value);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const order = !isDirecting ? "desc" : "asc";

    try {
      const response = await fetch(
        `https://video-assessment.onrender.com/api/search/?title=${title}&order=${order}`
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        setIsLoading(true);
        setIsSearching(true);
        setSearch(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        pr: 10,
      }}
    >
      <TextField label="Search..." onKeyUp={inputHandler} />
      <Button
        variant="outlined"
        onClick={searchHandler}
        sx={{ color: "#fff" }}
        id="search-btn"
      >
        <SearchIcon />
      </Button>
    </Box>
  );
};

export default Search;
