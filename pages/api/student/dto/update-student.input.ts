import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateStudentInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
