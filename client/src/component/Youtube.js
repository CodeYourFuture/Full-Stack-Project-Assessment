import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { vidContext } from '../contexts/YoutubeVidContext';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styled from 'styled-components';


const VideoContent = styled.div`
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
`;
const VidWrapper = styled.div`
      display: flex;
      align-self: center;
      flex-direction: column;
      justify-conten: center;
      margin: 1rem;
`;

const Rating = styled.div`
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
`;

const Title = styled.div`
      font-size: 1.4rem;
      margin-bottom: 0.5rem; 
  `;

const DeleteButton = styled.button`
      margin-top: 1rem;
      padding: 0.5rem 1.6rem;
      border-radius: 0.4rem;
      cursor: pointer;
      width: 8rem;
      align-self: center;
      background-color: red;
      color: white;
      font-size: 1.2rem;
      opacity: 0.8;
`;

const Youtube = () => {
  const { search, video, setVideo, removeVideo, filteredResults } = useContext(vidContext);

  const likeVotes = (e, index, id) => {
    e.preventDefault();
    const newVideos = [...video];
    newVideos[index].rating++;
    setVideo(newVideos);
  }
 
  const disLikeVotes = (e, index, id) => {
    e.preventDefault();
    const newVideos = [...video];
    newVideos[index].rating--;
    setVideo(newVideos);
  }

  return  search.length > 1? (
    <VideoContent>
      {filteredResults.map((vid, index)=>{
        return (
          <VidWrapper key = {index}>
            <Title>{vid.title}</Title>
            <Rating> <ThumbUpIcon color="error"onClick={e=>{likeVotes(e,index,vid.id)}}/> <h4>{vid.rating} votes</h4><ThumbDownIcon color="error" onClick={e=>{disLikeVotes(e,index,vid.id)}} /></Rating>  
            <ReactPlayer
              url={vid.url}
              config={{
                youtube: {
                  playerVars: { showinfo: 1,
                    origin: 'http://localhost:3000' },
                }  
              }}
              width='22rem'
            />
            <DeleteButton onClick={() => removeVideo(vid.id)}>Delete</DeleteButton>   
          </VidWrapper>
        )
      })}
    </VideoContent>
  ) : video.length> 1? (
    <VideoContent>
      {video.map((vid, index)=>{
        return (
          <VidWrapper key = {index}>
            <Title>{vid.title}</Title>
            <Rating> <ThumbUpIcon color="error"onClick={e=>{likeVotes(e,index,vid.id)}}/> <h4>{vid.rating} votes</h4><ThumbDownIcon color="error" onClick={e=>{disLikeVotes(e,index,vid.id)}} /></Rating>  
            <ReactPlayer
              url={vid.url}
              config={{
                youtube: {
                  playerVars: { showinfo: 1,
                    origin: 'http://localhost:3000' },
                }  
              }}
              width='22rem'
            />
            <DeleteButton onClick={() => removeVideo(vid.id)}>Delete</DeleteButton>   
          </VidWrapper>
        )
      })}
    </VideoContent>
  ) : (<h1>There isn't video to watch, please add a video</h1>)
}

export default Youtube;