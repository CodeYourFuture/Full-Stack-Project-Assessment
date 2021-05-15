import Card from "./VideoCard";

const VideoCards = (props) => {
  return (
    <div className="cards-container">
      {props.content.map((videoData, index) => (
        <Card key={index} data={videoData} onDelete={props.onDelete}/>
      ))}
    </div>
  );
};
export default VideoCards;