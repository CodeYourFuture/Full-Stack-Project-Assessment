export default function SortVideos({ sort, setSort }) {
  function handleSortChange(event) {
    setSort(event.target.value);
  }

  return (
    <div className="sort-videos-container">
      <div className="sort-videos-image-container">
        <img src="images/filter.png" alt="" className="sort-videos-image" />
      </div>
      <form className="sort-videos-form">
        <fieldset className="sort-videos-form-fieldset">
          <legend className="sort-videos-form-legend">Sort By (Rating):</legend>
          <input
            type="radio"
            id="sort-videos-form-by-descending"
            name="sort"
            value="desc"
            checked={sort === "desc"}
            onChange={handleSortChange}
            className="sort-videos-form-radio"
          />
          <label
            htmlFor="sort-videos-form-by-descending"
            className="sort-videos-form-label"
          >
            Descending
          </label>
          <input
            type="radio"
            id="sort-videos-form-by-ascending"
            name="sort"
            value="asc"
            checked={sort === "asc"}
            onChange={handleSortChange}
            className="sort-videos-form-radio"
          />
          <label
            htmlFor="sort-videos-form-by-ascending"
            className="sort-videos-form-label"
          >
            Ascending
          </label>
          <input
            type="radio"
            id="sort-videos-form-by-none"
            name="sort"
            value="none"
            checked={sort === "none"}
            onChange={handleSortChange}
            className="sort-videos-form-radio"
          />
          <label
            htmlFor="sort-videos-form-by-none"
            className="sort-videos-form-label"
          >
            None (by id)
          </label>
        </fieldset>
      </form>
    </div>
  );
}
