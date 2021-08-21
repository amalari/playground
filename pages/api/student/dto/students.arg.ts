import { ArgsType, Field, ID, InputType } from "type-graphql";
import { ListArg } from "../../common/dto/list.arg";
import { StudentFilterInput } from "./student-filter.input";

@ArgsType()
export class StudentsArg extends ListArg {
  @Field(() => StudentFilterInput, { nullable: true })
  filter: StudentFilterInput;
}
