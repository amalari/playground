import { InputType, Field, ID } from "type-graphql";

@InputType()
export class StudentFilterInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}
