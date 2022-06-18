import Likes from "./likes";
const RenderVideos = (props) => {
  const filterVideos = (videos, id) => videos.filter((v) => v.id !== id);

  return props.data.length===0?'Loading...':props.data.map((val, index) => {
    const id = val.url.split("v=")[1];
    return (
      <div key={index}>
        {val.title}
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button onClick={() => props.setData((v) => filterVideos(v, val.id))}>
          Delete
        </button>
        <Likes />
      </div>
    );
  });
};

export default RenderVideos;
