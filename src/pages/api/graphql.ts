/* eslint-disable consistent-return */
import { ApolloServer } from "apollo-server-micro";
import "reflect-metadata";
import type { MicroRequest } from "apollo-server-micro/dist/types";
import type { ServerResponse } from "http";
import { buildSchema } from "type-graphql";

import UserResolver from "../../graphql/schema/user/user.resolver";
import VideoResolver from "../../graphql/schema/video/video.resolver";
import cors from "../../lib/config/cors";
import { createContext } from "graphql/context";
import LikeResolver from "graphql/schema/like/like.resolver";

const schema = await buildSchema({
  resolvers: [UserResolver, VideoResolver, LikeResolver],
});

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: MicroRequest,
  res: ServerResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
