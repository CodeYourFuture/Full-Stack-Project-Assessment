const Search = (props) => {
    return (
    <div>
        <label>Search </label> <input onChange = {props.handleSearch} placeholder = "search videos"></input>
    </div>
    )
}

export default Search;