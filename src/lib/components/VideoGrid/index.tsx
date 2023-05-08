/* eslint-disable @typescript-eslint/no-explicit-any */
import { Center, Grid, Spinner } from "@chakra-ui/react";
import request from "graphql-request";
import { dehydrate, useQuery } from "react-query";

import { queryClient, videos } from "../../api";
import {
  AddDislikeDocument,
  AddLikeDocument,
  RemoveVoteDocument,
} from "generated/graphql";
import { API_URL } from "lib/config/constants";

import VideoCard from "./VideoCard";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("videos", () => videos());
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

type Props = {
  userId: string | null;
  sortDirection: string;
  userLikes: {
    [key: string]: number;
  };
  setUserLikes: (fn: (arg: any) => any) => void;
};

const VideoGrid = ({
  userLikes,
  userId,
  setUserLikes,
  sortDirection,
}: Props): JSX.Element => {
  const { data } = useQuery(["videos"], () => videos({ sortDirection }));

  const likeHandler = async (id: string): Promise<void> => {
    await request(API_URL, AddLikeDocument, {
      videoId: id,
      userId,
    }).then(() => {
      setUserLikes((prev) => ({ ...prev, [id]: 1 }));
    });
  };

  const dislikeHandler = async (id: string): Promise<void> => {
    await request(API_URL, AddDislikeDocument, {
      videoId: id,
      userId,
    }).then(() => {
      setUserLikes((prev) => ({ ...prev, [id]: -1 }));
    });
  };

  const removeVoteHandler = async (id: string): Promise<void> => {
    await request(API_URL, RemoveVoteDocument, {
      videoId: id,
      userId,
    }).then(() => {
      setUserLikes((prev) => {
        const newLikes = { ...prev };
        delete newLikes[id];
        return newLikes;
      });
    });
  };

  const actions = {
    like: likeHandler,
    dislike: dislikeHandler,
    removeVote: removeVoteHandler,
  };

  return (
    <Grid
      mt="5"
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
      ]}
      gap={6}
    >
      {data &&
        data.videos?.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            userVote={userLikes[video.id]}
            actions={actions}
          />
        ))}
    </Grid>
  );
};

export default VideoGrid;
