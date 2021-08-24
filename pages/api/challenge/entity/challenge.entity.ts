import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "The challenge model" })
export class Challenge {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  goolgeDriveFolder: string;

  @Field()
  gradingStatus: string;

  @Field({ nullable: true })
  grade: number;

  @Field(() => ID)
  studentId: string;

  @Field(() => ID, { nullable: true })
  reviewerId: string;
}
