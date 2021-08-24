import { InputType, Field, ID, Int } from "type-graphql";

@InputType()
export class SetGradeChallengeInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  grade: number;
}
