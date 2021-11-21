const VideoDisplay = ( prop ) =>

{
  let id = prop.video.url.substr(-11, prop.video.url.length);


    return (
        <>
        <ul className="Video-display">
          {/* <li key= {prop.index }> id {prop.video.id} </li> */}
          <li>{prop.video.title} </li>
          <li>{prop.video.rating} </li>
               
          <li>
            <iframe
              width="460"
              height="415"
                        src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </li>

          <li>
            <button> delete </button>
          </li>
        </ul>
      </>
    );


}
 

export default VideoDisplay;