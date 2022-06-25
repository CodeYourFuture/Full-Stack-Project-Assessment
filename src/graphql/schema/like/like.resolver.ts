import { Resolver, Ctx, Query, Arg, Mutation } from "type-graphql";

import * as context from "../../context";

/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable class-methods-use-this */

import Like from "./like";

@Resolver(Like)
export default class LikeResolver {
  @Query(() => [Like])
  async userLikes(
    @Ctx() ctx: context.Context,
    @Arg("userId", () => String) userId: string
  ): Promise<Like[]> {
    return await ctx.prisma.like.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  @Mutation(() => Like)
  async vote(
    @Ctx() ctx: context.Context,
    @Arg("userId", () => String) userId: string,
    @Arg("videoId", () => String) videoId: string,
    @Arg("vote", () => Number) vote: number
  ): Promise<Like> {
    if (vote === 0) {
      return await ctx.prisma.like.delete({
        where: {
          user_id_video_id: { user_id: userId, video_id: videoId },
        },
      });
    }
    return await ctx.prisma.like.upsert({
      where: {
        user_id_video_id: { user_id: userId, video_id: videoId },
      },
      update: {
        vote,
      },
      create: {
        user_id: userId,
        video_id: videoId,
        vote,
      },
    });
  }
}
