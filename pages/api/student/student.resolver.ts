import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { Student } from "./entity/student.entity";

@Resolver()
@Service()
export default class StudentResolver {
  @Query(() => [Student], { name: "students" })
  findAll() {
    return [
      {
        id: "1",
        name: "student",
        email: "test",
      },
    ];
  }
}
