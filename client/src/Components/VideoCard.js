import Votes from "./Votes";
import DeleteButton from "./DeleteButton";

const VideoCard = (props) => {
  const { data, setData } = props;
  console.log(data);

  return (
    <div className="video-container">
      {data.map((item, index) => {
        return (
          <div className="video-card">
            <h3>{item.title}</h3>
            <div className="video-votes-div">
              <iframe
                width="440"
                height="260"
                src={`https://www.youtube.com/embed/${item.url.slice(-11)}`}
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
