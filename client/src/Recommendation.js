
export default function Recommendation({video, deleteVideo}) {
  const params = new URL(video.url).searchParams;
  const embedUrl = `https://www.youtube.com/embed/${params.get('v')}`;
  return (
    <div>
      <h3>{video.title}</h3>
      <iframe width="560" height="315" src={embedUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div>rating: {video.rating}</div>
      <button onClick={() => deleteVideo(video.id)}>delete</button>
    </div>
  );
}