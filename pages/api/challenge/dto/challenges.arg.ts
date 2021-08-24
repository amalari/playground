import { ArgsType, Field, ID, InputType } from "type-graphql";
import { ListArg } from "../../common/dto/list.arg";
import { ChallengeFilterInput } from "./challenge-filter.input";

@ArgsType()
export class ChallengesArg extends ListArg {
  @Field(() => ChallengeFilterInput, { nullable: true })
  filter: ChallengeFilterInput;
}
