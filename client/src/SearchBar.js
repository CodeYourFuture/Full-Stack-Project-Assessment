import React, { useState } from 'react';

const SearchBar = ({ stateUpdater, videos }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value.toLowerCase());
    const searchResult = videos.filter((video) =>
      video.title.toLowerCase().includes(searchInput)
    );
    stateUpdater(searchResult);
    if (e.target.value === '') stateUpdater(videos);
  };

  return (
    <div key='input-form' className='search-input-wrapper'>
      <i key='fasIcon' className='fas fa-search'></i>
      <input
        key='search-input'
        type='text'
        className='search-bar'
        placeholder='Search for a video ...'
        value={searchInput}
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;