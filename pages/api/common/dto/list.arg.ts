import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class ListArg {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => [[String]], { defaultValue: [["id", "desc"]] })
  sort: [[String]];
}
