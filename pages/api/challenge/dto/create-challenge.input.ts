import { InputType, Field, ID } from "type-graphql";
import { Challenge } from "../entity/challenge.entity";

@InputType()
export class CreateChallengeInput implements Partial<Challenge> {
  @Field()
  name: string;

  @Field({ nullable: true })
  goolgeDriveFolder: string;

  @Field(() => ID)
  studentId: string;
}
