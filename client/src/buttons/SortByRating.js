import React, { useState } from "react";
import { FaSort } from "react-icons/fa"
import { useGlobalContext } from '../context/VideoContext';
function SortByRating({ handleSort }) {



  return (
    <div className="sort" style={{ width: '10rem', textAlign: 'center', margin: 'auto' }}>
      <div>Rating
        <FaSort style={{ color: 'blue', fontSize: '40px' }} onClick={handleSort} />
      </div>
    </div >
  );
}

export default SortByRating;