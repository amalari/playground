import { InputType, Field } from "type-graphql";

@InputType()
export class CreateStudentInput {
  @Field()
  name: string;

  @Field()
  email: string;
}
