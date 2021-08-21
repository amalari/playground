import { ArgsType, Field, ID, InputType } from "type-graphql";
import { StudentFilterInput } from "./student-filter.input";

@ArgsType()
export class StudentArg {
  @Field(() => StudentFilterInput, { nullable: true })
  filter: StudentFilterInput;
}
