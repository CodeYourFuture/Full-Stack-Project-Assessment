//notes:
//creates entries for each video in the provided
//database that follows this layout:
// [
//   {
//     "id": 523523,
//     "title": "Never Gonna Give You Up",
//     "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
//     "rating": 23
//   },
//   {
//     "id": 523427,
//     "title": "The Coding Train",
//     "url": "https://www.youtube.com/watch?v=HerCR8bw_GE",
//     "rating": 230
//   }
// ]
//recommend the use of a copy of the original data
//due to the destructive nature of the remove function.

import VideoComponent from "./VideoComponent"
const VideoListDisplay = (props) => {
  return (
    <section className="video-section">
      <ul className="video-list">
        {props.database.map((vid, i) => {
          return (
            <div key={`video-${i}`}>
              <VideoComponent video={vid} index={i} remove={props.remove}/>
            </div>
          );
        })}
      </ul>
    </section>
  );
};
export default VideoListDisplay;
