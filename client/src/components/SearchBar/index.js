import React, { useState } from 'react'

import "./searchBar.css"
function SearchBar(props) {
    const { onChange } = props
    const [searchPhrase, setSearchPhrase] = useState("");
    const [sort, setSort] = useState("asc");


    // onChange({ search: searchPhrase, sort })
    return (
        <div className="searchbar">
            <input className="searchbar__search"
                type="text"
                value={searchPhrase}
                onChange={(e) => {
                    setSearchPhrase(e.target.value)
                    onChange({ search: searchPhrase, sort })
                }}
                placeholder="Search here"
            />
            <div className="searchbar__sort">
                <span>
                    <label >Asc</label>
                    <input type="radio" name="sort" value="asc" checked={sort === "asc"} onChange={(e) => {
                        setSort(e.target.value)
                        onChange({ search: searchPhrase, sort: e.target.value })
                    }} />
                </span>
                <span>
                    <label >Desc</label>
                    <input type="radio" name="sort" value="desc" checked={sort === "desc"} onChange={(e) => {
                        setSort(e.target.value)
                        onChange({ search: searchPhrase, sort: e.target.value })
                    }} />
                </span>
            </div>
        </div>
    )
}

export default SearchBar