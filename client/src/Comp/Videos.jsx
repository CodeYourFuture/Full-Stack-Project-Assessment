import data from "../Data/data.json";
import "../Style/Videos.css";
// console.log(data);
const Videos = ({videos, onVideoDelete}) => {
  
  return (
    <div className="videos">
      {videos.map((vid, index) => {
        const videoId = vid.url.substring(vid.url.indexOf("?v=")+3)
        console.log(videoId);
     return (

        <section key={index} className="videos-cont">
          
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/"+videoId}
            title={vid.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <h3>{vid.title}</h3>
          <div className="like-dislik-delete-span">
            <span>Rating:{vid.rating}</span>
            <div className="like-dislik-delete">
              <button className="like-button">Up Vote</button>
              <button className="dislike-button">Down Vote</button>
              <button className="delete" onClick={()=> onVideoDelete(index)}>Delete</button>
            </div>
          </div>

          <div></div>
        </section>
     )
      })}
    </div>
  );
};

export default Videos;
