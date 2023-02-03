import YouTubeEmbed from "./YouTubeEmbed";
import DeleteButton from "./buttons/DeleteButton";
import moment from "moment";
import LikeIcon from "./buttons/LikeIcon";
import DislikeIcon from "./buttons/DislikeIcon";
import { useState } from "react";

export default function Video({ video, setURL, order }) {
  const [isVoted, setIsVoted] = useState(video.isvoted);
  let voteVideo = video.vote;
  const postedDate = moment(moment(video.posteddate).toDate()).format(
    "DD-MM-YYYY"
  );

  const handleVote = async (e) => {
    voteVideo = video.vote;

    if (e) ++voteVideo;
    else --voteVideo;

    await fetch("/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: video.id,
        vote: voteVideo,
        isVoted: !isVoted,
      }),
    });
    //const vid = await res.json();

    //voteCount = e ? vote + 1 : vote - 1;
    setIsVoted(!isVoted);
    setURL(
      `order/?by=${order}&${Math.floor(Math.random() * (1000 - 10 + 1) + 10)}`
    );
  };

  return (
    <div className="video-container">
      <p>{video.title}</p>
      <div className="vote-container">
        <LikeIcon clickFunc={handleVote} isVoted={isVoted} />
        <p>{isVoted ? voteVideo : voteVideo} Vote</p>
        <DislikeIcon clickFunc={handleVote} isVoted={!isVoted} />
      </div>
      {video.url ? <YouTubeEmbed video={video} /> : ""}
      <p className="m-2">
        {moment(postedDate, "DD-MM-YYYY", true).isValid()
          ? "Posted on " + postedDate
          : ""}
      </p>
      <DeleteButton setURL={setURL} order={order} videoID={video.id} />
    </div>
  );
}
