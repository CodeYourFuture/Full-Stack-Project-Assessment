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
const VideoDisplay = (props) => {
  return (
    <ul className="video-list">
      {props.database.map((video, index) => {
        return (
          <li
            className="video-list-item"
            id={`video-list-item-${index}`}
            key={`video-${index}-key`}
          >
            <h3>{video.title}</h3>
            <iframe
              width="560"
              height="315"
              // the commented out version allows the videos to run but youtube gets upset when
              // you ask for so much :P
              // src={video.url.replace("watch", "embed")}
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>Votes: 0 [TEMP]</p>
          </li>
        );
      })}
    </ul>
  );
};
export default VideoDisplay;
