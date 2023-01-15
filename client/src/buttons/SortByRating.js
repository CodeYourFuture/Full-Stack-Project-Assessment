import React, { useState } from "react";
import { FaSort } from "react-icons/fa"
import { useGlobalContext } from '../context/VideoContext';
function SortByRating({ handleSort }) {



  return (
    <div className="sort" >
      <div>Sort by rating
        <FaSort style={{ color: '#093e43', fontSize: '40px' }} onClick={handleSort} />
      </div>
    </div >
  );
}

export default SortByRating;