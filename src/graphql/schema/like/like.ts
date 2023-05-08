import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Like {
  @Field()
  user_id!: string;

  @Field()
  video_id!: string;

  @Field()
  vote!: number;
}
