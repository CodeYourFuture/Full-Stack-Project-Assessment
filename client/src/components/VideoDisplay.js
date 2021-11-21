const VideoDisplay = ( prop ) =>


{
    return (
      <>
        <ul className='Video-display'>
                <li key= {prop.index }> id {prop.video.id} </li>
                <li>{ prop.video.title} </li>
                <li> {prop.video.url}</li>
                <li>{prop.video.rating} </li>
        </ul>
      </>
    );


}
 

export default VideoDisplay;