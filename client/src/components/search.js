const Search = (props) => {
    // console.log(props)
    return (
    <div>
        Search <input onChange = {props.handleSearch}></input>
    </div>
    )
}

export default Search;