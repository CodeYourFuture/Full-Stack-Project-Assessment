import { Box, Button, HStack, Link, Text, VStack } from "@chakra-ui/react";
import request from "graphql-request";
import { useEffect, useState } from "react";

import { AddUserDocument, UserLikesDocument } from "generated/graphql";
import AddVideo from "lib/components/AddVideo";
import VideoGrid from "lib/components/VideoGrid";
import { API_URL } from "lib/config/constants";

interface ILike {
  video_id: string;
  vote: number;
}

interface IUserLikes {
  [key: string]: number;
}

const reduceLikes = (likes: ILike[]): IUserLikes => {
  const reduced: IUserLikes = {};
  likes.forEach((curr: ILike) => {
    reduced[curr.video_id] = curr.vote;
  });
  return reduced;
};

const Home = () => {
  const [userId, setUserId] = useState<string | null>("");
  const [userLikes, setUserLikes] = useState<IUserLikes>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [sortDirection, setSortDirection] = useState<string>("desc");

  const sortDirHandler = () => {
    setSortDirection((prev) => {
      return prev === "desc" ? "asc" : "desc";
    });
  };

  useEffect(() => {
    async function getUser() {
      const user = localStorage.getItem("userId");
      if (user) {
        setUserId(user);
        const data = await request(API_URL, UserLikesDocument, {
          userId,
        });
        if (data?.userLikes.length > 0) {
          setUserLikes(reduceLikes(data.userLikes));
        } else {
          setUserLikes({});
        }
        setLoading(false);
      } else {
        const { addUser } = await request(API_URL, AddUserDocument);
        setUserId(addUser.id);
        localStorage.setItem("userId", addUser.id);
        setLoading(false);
      }
    }
    getUser();
  }, [userId]);
  return (
    <VStack
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <HStack>
        {userId && <AddVideo userId={userId} />}
        <Text>
          Sort By Votes:{" "}
          <Button onClick={sortDirHandler} variant="link">
            {sortDirection}
          </Button>
        </Text>
      </HStack>
      {!loading && (
        <VideoGrid
          sortDirection={sortDirection}
          userLikes={userLikes}
          userId={userId}
          setUserLikes={setUserLikes}
        />
      )}
    </VStack>
  );
};

export default Home;
