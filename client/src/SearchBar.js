import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('exampleresponse.json');
      const json = await response.json();
      setSearchResults(json);
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = searchResults.filter((result) =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <br />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.title}>
            {result.title} - {result.url}
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchBar;