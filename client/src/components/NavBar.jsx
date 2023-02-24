import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

const NavBar = ({ onSearch, setIsOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full bg-blue-500">
      <nav className="md:container md:mx-auto flex items-center justify-between flex-wrap  p-6 w-full">
        <div className="flex items-center flex-shrink-0 text-white">
          <form onSubmit={handleSearch}>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-gray-200 hover:bg-gray-300 rounded-l p-2"
              >
                <FaSearch className="text-gray-700 h-6" />
              </button>
              <input
                className="bg-gray-200 appearance-none h-10 border-2 border-gray-200 rounded-r py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex items-center flex-shrink-0 text-white">
          <button
            className="bg-transparent hover:bg-white flex items-center text-white font-semibold hover:text-blue-500 py-2 px-4 border border-white hover:border-transparent rounded h-10"
            onClick={() => setIsOpen(true)}
          >
            <HiPlus className="text-white mr-2  cursor-pointer" />
            Add Video
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
