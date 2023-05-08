/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Ctx,
  Mutation,
  InputType,
  Field,
  Arg,
} from "type-graphql";

import * as context from "../../context";

import Video from "./video";

@InputType()
export class VideoInput {
  @Field()
  title!: string;

  @Field()
  url!: string;

  @Field()
  created_by_id!: string;
}

@Resolver(Video)
export default class VideoResolver {
  @Query(() => [Video])
  async videos(@Ctx() ctx: context.Context): Promise<Video[]> {
    const getVideos = await ctx.prisma.video.findMany({
      include: {
        likes: {
          select: {
            vote: true,
          },
        },
      },
    });
    return getVideos.map((video) => {
      const videoLikes = video.likes.filter((v) => v.vote === 1).length;
      const videoDislikes = video.likes.filter((v) => v.vote === -1).length;
      return {
        ...video,
        rating: videoLikes - videoDislikes,
      };
    });
  }

  @Query(() => Video)
  async video(
    @Ctx() ctx: context.Context,
    @Arg("id", () => String) id: string
  ): Promise<Video | null> {
    return await ctx.prisma.video.findFirst({ where: { id } });
  }

  @Mutation(() => Video)
  async addVideo(
    @Ctx() ctx: context.Context,
    @Arg("video", () => VideoInput) video: VideoInput
  ): Promise<Video> {
    return await ctx.prisma.video.create({
      data: video,
    });
  }
}
