import { Field, ID, ObjectType } from "type-graphql";

@ObjectType({ description: "The student model" })
export class Student {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
