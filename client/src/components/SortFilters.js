import React, { useState } from "react";
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
      <button onClick={handleSortByVotes}>Sort by Votes</button>
      <button onClick={handleSortByTitle}>Sort by Title</button>
    </div>
  );
};

export default SortFilters;
