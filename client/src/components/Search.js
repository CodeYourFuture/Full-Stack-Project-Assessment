import { useRef } from "react";

const Search = ({ handelSearch }) => {
  const keyword = useRef();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") { 
      handelSearch(keyword.current.value);
    }
  };

  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        ref={keyword}
        placeholder="Search Here"
      />
      <button onClick={() => handelSearch(keyword.current.value)}>
        Search Video
      </button>
    </div>
  );
};

export default Search;
