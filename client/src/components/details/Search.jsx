import React from 'react'

const Search = ({ searchHandler }) => {
  return (
    <div className="search">
      <input
        className="form-control"
        onChange={(e) => {
          searchHandler(e.target.value)
        }}
        placeholder="Search..."
      />
    </div>
  )
}

export default Search
