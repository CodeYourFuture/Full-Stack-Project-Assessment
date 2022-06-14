import Votes from "./Votes";
import DeleteButton from "./DeleteButton";

const VideoCard = (props) => {
  const { data, setData } = props;
  console.log(data.map((item)=> item))
  return (
    <div className="video-container">
      {data.map((item, index) => {
        return (
          <div key={index} className="video-card">
            <h3>{item.title}</h3>
            <div className="video-votes-div">
              <iframe
                src={`https://www.youtube.com/embed/${item.url.slice(
                  item.url.indexOf("=") + 1
                )}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* <div className="buttons-div"> */}
              <Votes rating={item.rating} />
            </div>
            <DeleteButton index={index} data={data} setData={setData} />
            {/* </div> */}
          </div>
        );
      })}
    </div>
  );
};
export default VideoCard;
