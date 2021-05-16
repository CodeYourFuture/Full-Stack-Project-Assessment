import React from 'react'

const Search = ({setSearchVAl}) => {
    const handleSearch = (e) => {
        console.log(e.target.value)
    //   setSearchVAl(e.target.value);
    };
    return (
      <div>
        <input
          className="m-5"
          type="text"
          placeholder="Search videos ..."
          onChange={handleSearch}
        />
      </div>
    );
}

export default Search
