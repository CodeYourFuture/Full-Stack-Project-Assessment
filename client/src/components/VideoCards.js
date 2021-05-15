import Card from "./VideoCard";

const VideoCards = ({ content }) => {
  return (
    <div className="cards-container">
      {content.map((videoData, index) => (
        <Card key={index} data={videoData} />
      ))}
    </div>
  );
};
export default VideoCards;
