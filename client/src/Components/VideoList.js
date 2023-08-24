import OneVideoCard from "./OneVideoCard";
const VideoList = ({ keyword, videoCards, setVideoCards }) => {
  const handleDelete = (idVideo) => {
    setVideoCards(videoCards.filter((video) => video.id !== idVideo));
  };
  return (
    <>
      {/* <h1 className="blink_me">Loading.....</h1> */}
      <section className="p-5" id="recommendations">
        <div className="container">
          <div className="row row-cols-auto text-center custom-gap ">
            {videoCards
              .filter((video) => {
                if (keyword === "") {
                  return video;
                } else if (
                  video.title.toLowerCase().includes(keyword.toLowerCase())
                ) {
                  return video;
                }
              })
              .map((video) => (
                <OneVideoCard
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  rating={video.rating}
                  url={video.url.substring(video.url.indexOf("=") + 1)}
                  handleDelete={handleDelete}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default VideoList;
