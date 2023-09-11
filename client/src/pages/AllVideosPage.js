import { useState, useEffect } from "react";
import VideoLists from "../components/VideoLists";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AllVideos = ({ allVideos, getAllVideos, isLoading, order, setOrder }) => {
  const orderHandle = (e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    getAllVideos(newOrder);
  };

  return (
    <>
      {isLoading ? (
        <div className="spinner">
          <FontAwesomeIcon icon={faSpinner} spin />
          <p>Loading...</p>
        </div>
      ) : (
        allVideos && (
          <div>
            <div className="order-videos">
              <label>Order by votes </label>
              <select value={order} onChange={orderHandle}>
                <option value="desc">Desc</option>
                <option value="asc">Asce</option>
              </select>
            </div>
            <VideoLists allVideos={allVideos} getAllVideos={getAllVideos} />
          </div>
        )
      )}
    </>
  );
};

export default AllVideos;

// const getAllVideos = async (searchText, MoviesOrder) => {
//     let order = "";
//     if (MoviesOrder === undefined || MoviesOrder === "desc") {
//       order = "desc";
//     } else {
//       order = "asc";
//     }

//     try {
//       let url = `${process.env.REACT_APP_SERVERURL}/?order=${order}`;
//       if (searchText) {
//         url += `&search=${searchText}`;
//       }
//       const response = await fetch(url);
//       if (!response.status === 200) {
//         throw new Error("something went wrong!");
//       }
//       const data = await response.json();
//       setAllVideos(data);
//       setIsLoading(false);
//     } catch (error) {
//       console.error(error);
//       setIsLoading(false);
//     }
//   };
