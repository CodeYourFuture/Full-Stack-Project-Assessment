/* eslint-disable import/extensions */
import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

import { getSdk } from "../generated/graphql";

const gqlClient = new GraphQLClient("/api/graphql");

export const { addUser, videos, addLike, removeVote, addDislike } =
  getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});
