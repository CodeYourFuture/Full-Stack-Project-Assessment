export default function videossCard({ videos }) {
  return (
    <>
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <iframe
            title={video.title}
            src={video.url.replace("watch?v=", "embed/")}
            width="500"
            height="281"
          />
          <div>
            <button>video.rating</button>
            <button>delete</button>
          </div>
        </div>
      ))}
    </>
  );
}
