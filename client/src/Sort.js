function Sort({ sort, setSort })
{
    const switchSort = () => 
    {
        setSort(sort === "asc" ? "desc" : "asc");
    }

    return (
        <div className="sortDiv">
            <button id="sortButton" onClick={() => switchSort(sort)}>Sort</button>
        </div>
    );
}

export default Sort;