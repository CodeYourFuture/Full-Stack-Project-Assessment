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

const videoDisplay = (props) => {
  return (
    <div>
      {props.database.map((video, index) => {
        return (
          <>
            <h3>{video.title}</h3>
            <iframe
              width="560"
              height="315"
              src={video.url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <p>Votes: {video.rating}</p>
            <button type="button" onClick={props.database.splice(index, 1)}>
              Remove Entry
            </button>
          </>
        );
      })}
    </div>
  );
};
export default videoDisplay;
