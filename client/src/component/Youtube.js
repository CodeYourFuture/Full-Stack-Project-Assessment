import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { vidContext } from '../contexts/YoutubeVidContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styled from 'styled-components';

const VideoContent = styled.div`

width: 100%;

`;
const VidWrapper = styled.div`
     display: flex,
     align-self: center,
     width: 22rem,  
`;

const Rating = styled.div`
disply: flex,
align-items: center`



const Youtube = () => {
  const { video, setVideo, filtered, removeVideo } = useContext(vidContext);

  const likeVotes = (e, index, id) => {
    e.preventDefault();
    const newVideos = [...video];
    newVideos[index].rating++;
  }
  const disLikeVotes = (e, index, id) => {
    e.preventDefault();
    const newVideos = [...video];
    newVideos[index].rating--;
    setVideo(newVideos);
  }

  return  filtered && filtered.length? (
    <VideoContent>
  
      {filtered.map((vid, index)=>{
        
        return (
          <VidWrapper key = {index}>
            <div className="title">{vid.title}</div>
            <Rating style={{
              display: 'flex',
              flexDirection: 'row'
            }}> <ThumbUpIcon color="error"onClick={e=>{likeVotes(e,index,video.id)}}/> <h4>{video.rating} votes</h4><ThumbDownIcon color="error" onClick={e=>{disLikeVotes(e,index,video.id)}} /></Rating>
            
          <ReactPlayer
            url={vid.url}
            config={{
              youtube: {
                playerVars: { showinfo: 1,
                  origin: 'http://localhost:3000' },
      
              }  
            }}
          />

            <div>
              <button onClick={() => removeVideo(vid.id)}>Delete</button>
            </div>
          </VidWrapper>
        )
      })}
    </VideoContent>
  ): (<h1>There isn't video to watch, please add a video</h1>)
}

export default Youtube;