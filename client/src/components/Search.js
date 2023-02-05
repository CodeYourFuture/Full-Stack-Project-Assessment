import { useRef } from "react";

const Search = () => {
  const keyword = useRef();

  const SearchHandler = () => {
    console.log(keyword.current.value);
  };

  return (
    <div>
      <input type="text" ref={keyword} placeholder="Search Here" />
      <button onClick={SearchHandler}>Search Video</button>
    </div>
  );
};

export default Search;
