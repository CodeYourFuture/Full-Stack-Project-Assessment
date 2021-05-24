const Search = (props) => {
    return (
    <div>
        Search <input onChange = {props.handleSearch}></input>
    </div>
    )
}

export default Search;