import { Resolver, Mutation, Ctx } from "type-graphql";

import * as context from "../../context";

/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable class-methods-use-this */

import User from "./user";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async addUser(@Ctx() ctx: context.Context): Promise<User> {
    return await ctx.prisma.user.create({ data: {} });
  }
}
