import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import "../styles/SortFilters.css";

const SortFilters = ({ onSortByVotes, onSortByTitle }) => {
  const [votesSortOrder, setVotesSortOrder] = useState("asc");
  const [titleSortOrder, setTitleSortOrder] = useState("asc");

  const handleSortByVotes = () => {
    const newSortOrder = votesSortOrder === "asc" ? "desc" : "asc";
    setVotesSortOrder(newSortOrder);
    onSortByVotes(newSortOrder);
  };

  const handleSortByTitle = () => {
    const newSortOrder = titleSortOrder === "asc" ? "desc" : "asc";
    setTitleSortOrder(newSortOrder);
    onSortByTitle(newSortOrder);
  };

  return (
    <div className="sort-filters">
      <Button variant="contained" color="primary" onClick={handleSortByVotes}>
        Sort by Votes
      </Button>
      <Button variant="contained" color="primary" onClick={handleSortByTitle}>
        Sort by Title
      </Button>
    </div>
  );
};

export default SortFilters;
