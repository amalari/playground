import { InputType, Field, ID } from "type-graphql";

@InputType()
export class ChallengeFilterInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  gradingStatus: string;

  @Field({ nullable: true })
  grade: number;

  @Field(() => ID, { nullable: true })
  studentId: string;

  @Field(() => ID, { nullable: true })
  reviewerId: string;
}
