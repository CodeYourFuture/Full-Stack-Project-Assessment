function Sort({ sort, setSort })
{
    const switchSort = () => 
    {
        if (sort === "asc")
        {
            setSort("desc");
        }

        else if (sort === "desc")
        {
            setSort("asc");
        }
    }


    return (
        <div className="sortDiv">
            <button id="sortButton" onClick={() => switchSort(sort)}>Sort</button>
        </div>
    );
}

export default Sort;