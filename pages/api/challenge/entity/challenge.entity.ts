import { Field, ID, ObjectType } from "type-graphql";
import { Student } from "../../student/entity/student.entity";

@ObjectType({ description: "The challenge model" })
export class Challenge {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  googleDriveFolder: string;

  @Field()
  gradingStatus: string;

  @Field({ nullable: true })
  grade: number;

  @Field(() => ID)
  studentId: string;

  @Field(() => ID, { nullable: true })
  reviewerId: string;

  @Field(() => Student, { nullable: true })
  student: Student;

  @Field(() => Student, { nullable: true })
  reviewer: Student;
}
