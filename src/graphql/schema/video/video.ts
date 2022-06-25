/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { Field, ObjectType, ID } from "type-graphql";

@ObjectType()
export default class Video {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  url!: string;

  @Field()
  created_by_id!: string;

  @Field()
  rating!: number;
}
