import { ArgsType, Field, ID, InputType } from "type-graphql";
import { ChallengeFilterInput } from "./challenge-filter.input";

@ArgsType()
export class ChallengeArg {
  @Field(() => ChallengeFilterInput, { nullable: true })
  filter: ChallengeFilterInput;
}
