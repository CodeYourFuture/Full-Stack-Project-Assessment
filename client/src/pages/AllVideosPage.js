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
          <div className="videos">
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
