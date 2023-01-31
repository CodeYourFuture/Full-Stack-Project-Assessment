import React, { useState} from 'react'

const AscDesc = () => {
    //   const [profile, setProfile] = useState({});
    //   const [customerId, setCustomerId] = useState(null);
      const [display, setDisplay] = useState(false);

     const ascDescHandler = () => {
    //    setCustomerId(id);
       !display ? setDisplay(true) : setDisplay(false);
     };
  return (
    <div>
      <button
        onClick={ascDescHandler}
        className="btn btn-secondary  mt-3 shadow rounded"
      >
        {!display ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}

export default AscDesc