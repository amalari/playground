import { ObjectType } from "type-graphql";
import PaginatedResponse from "../../common/dto/paginated.response";
import { Student } from "../entity/student.entity";

@ObjectType()
export class StudentsResponse extends PaginatedResponse(Student) {
  // you can add more fields here if you need
}
