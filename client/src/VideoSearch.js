import React from "react";

export default function VideoSearch({ allVideos, searchedVideos }) {
  // console.log(videos);
  // const [search, setSearch] = useState(""); // useState probably not required
  // console.log(search);
  // Search Function
  const handleSearch = (e) => {
    e.preventDefault();
    let searchVal = e.target.value;
    console.info("Searching For", searchVal);
    // setSearch(searchVal);

    const filteredResult = allVideos.filter((element) => {
      return element.title.toLowerCase().includes(searchVal.toLowerCase());
    });
    searchedVideos(filteredResult);
  };
  return (
    <div className="search-bar">
      <input
        onKeyUp={handleSearch}
        type="search"
        // value={search}
        name="search"
        placeholder="Search..."
      />
    </div>
  );
}
