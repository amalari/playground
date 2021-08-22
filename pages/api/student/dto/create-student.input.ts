import { InputType, Field } from "type-graphql";
import { Student } from "../entity/student.entity";

@InputType()
export class CreateStudentInput implements Partial<Student> {
  @Field()
  name: string;

  @Field()
  email: string;
}
