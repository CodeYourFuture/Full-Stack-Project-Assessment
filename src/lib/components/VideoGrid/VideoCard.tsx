import { GridItem, Heading } from "@chakra-ui/react";
import ReactPlayer from "react-player";

import { Video } from "generated/graphql";

import VideoLikes from "./VideoLikes";

type Props = {
  video: Video;
  userVote: number;
  actions: {
    like: (id: string) => void;
    dislike: (id: string) => void;
    removeVote: (id: string) => void;
  };
};

const VideoCard = ({ video, userVote, actions }: Props): JSX.Element => (
  <GridItem>
    <Heading as="h4" size="md">
      {video.title}
    </Heading>
    <ReactPlayer url={video.url} width="100%" />
    <VideoLikes
      id={video.id}
      userVote={userVote}
      rating={video.rating}
      actions={actions}
    />
  </GridItem>
);

export default VideoCard;
