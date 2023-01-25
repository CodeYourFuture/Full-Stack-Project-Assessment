function Sort({ sort, setSort })
{
    const switchSort = () => 
    {
        if (sort === "?order=asc")
        {
            setSort("?order=desc");
            console.log(sort);
        }

        else if (sort === "?order=desc")
        {
            setSort("?order=asc");
            console.log(sort);
        }
    }


    return (
        <div className="sortDiv">
            <button onClick={() => switchSort(sort)}>Sort</button>
        </div>
    );
}

export default Sort;