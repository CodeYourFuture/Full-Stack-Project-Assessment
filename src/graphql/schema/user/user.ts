/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-cycle */
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
class UserLike {
  @Field()
  video_id: string;

  @Field()
  vote: number;

  @Field()
  created_at: Date;
}

@ObjectType()
export default class User {
  @Field(() => ID)
  id!: string;

  @Field(() => [UserLike], { defaultValue: [] })
  likes: UserLike[];
}
