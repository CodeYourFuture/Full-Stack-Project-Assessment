import styled from "styled-components";

const VideoCard = ({ title, url, ratings, addLike, removeLike, vid, deleteVid, getVid }) => {
  console.log({ url: url });
  const videoID = url.split("=").slice(-1)[0];

  const embedUrl = `https://www.youtube.com/embed/${videoID}`;
  //console.log(embedUrl);

  const handleClick = (e) => {
    e.preventDefault();
    //console.log("onlick inside vid card ");
    const parameter = vid;
    //console.log({ vid });
    addLike(parameter);
  };
  const handleUnClick = (e) => {
    e.preventDefault();
    //console.log("onlick inside vid card ");
    const parameter = vid;
    //console.log({ vid });
    removeLike(parameter);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    //console.log("onlick inside vid card ");
    const parameter = vid;
    //console.log({ vid });
    deleteVid(parameter);
  };
  const handleShowOne = (e) => {
    e.preventDefault();
    //console.log("onlick inside vid card ");
    const parameter = vid;
    //console.log({ vid });
    getVid(parameter);
  };

  return (
    <VideoCardContainer>
      <button onClick={handleClick}>like</button>

      <h2>likes {ratings}</h2>

      <button onClick={handleUnClick}>dislike</button>
      <VideoCardTitle>{title}</VideoCardTitle>
      <VideoCardTitle>{ratings}</VideoCardTitle>
      <VideoCardFrame
        src={embedUrl}
        title={title}
        width="100%"
        frameBorder="0"
        allowFullScreen
      ></VideoCardFrame>
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleShowOne}>more info</button>
    </VideoCardContainer>
  );
};

export default VideoCard;

const VideoCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  background-color: grey;
  width: 40%;
  min-width: 315px;
`;

const VideoCardTitle = styled.h2`
  margin-bottom: 10px;
`;

const VideoCardFrame = styled.iframe`
  width: 100%;
  min-height: 250px;
  border: none;
`;
