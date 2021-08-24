import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UpdateChallengeInput {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  googleDriveFolder: string;

  @Field(() => ID)
  studentId: string;
}
