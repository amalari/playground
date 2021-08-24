import { InputType, Field, ID } from "type-graphql";

@InputType()
export class SetReviewerChallengeInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  reviewerId: string;
}
