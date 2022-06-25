import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";

import LikeButton from "./LikeButton";

type Props = {
  id: string;
  rating: number;
  userVote: number;
  actions: {
    like: (id: string) => void;
    dislike: (id: string) => void;
    removeVote: (id: string) => void;
  };
};

const VideoLikes = ({ id, rating, userVote, actions }: Props): JSX.Element => {
  const { like, dislike, removeVote } = actions;
  const [vote, setVote] = useState(userVote || 0);
  const [ratingState, setRatingState] = useState(rating || 0);
  const handleLike = (): void => {
    if (vote === -1) {
      like(id);
      setVote(1);
      setRatingState(ratingState + 2);
    } else if (vote === 1) {
      removeVote(id);
      setVote(0);
      setRatingState(ratingState - 1);
    } else {
      like(id);
      setVote(1);
      setRatingState(ratingState + 1);
    }
  };

  const handleDislike = (): void => {
    if (vote === 1) {
      dislike(id);
      setVote(-1);
      setRatingState(ratingState - 2);
    } else if (vote === -1) {
      removeVote(id);
      setVote(0);
      setRatingState(ratingState + 1);
    } else {
      dislike(id);
      setVote(-1);
      setRatingState(ratingState - 1);
    }
  };
  return (
    <Flex align="center" justify="center" gap="2" mt="2">
      <Box as="span" cursor="pointer" onClick={handleLike}>
        <LikeButton type="like" state={vote === 1 ? "pressed" : "unpressed"} />
      </Box>
      {ratingState}
      <Box as="span" cursor="pointer" onClick={handleDislike}>
        <LikeButton
          type="dislike"
          state={vote === -1 ? "pressed" : "unpressed"}
        />
      </Box>
    </Flex>
  );
};

export default VideoLikes;
