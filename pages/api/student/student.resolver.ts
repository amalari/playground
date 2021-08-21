import { Args, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { StudentArg } from "./dto/student.arg";
import { StudentsArg } from "./dto/students.arg";
import { StudentsResponse } from "./dto/students.response";
import { Student } from "./entity/student.entity";
import { StudentService } from "./student.service";

@Resolver()
@Service()
export class StudentResolver {
  constructor(
    // constructor injection of a service
    private readonly studentService: StudentService
  ) {}

  @Query(() => StudentsResponse, { name: "students" })
  findAll(@Args() params: StudentsArg) {
    const { data, count } = this.studentService.findAndCountAll(params);
    return {
      data,
      meta: {
        page: params.page,
        limit: params.limit,
        total: count,
      },
    };
  }

  @Query(() => Student, { name: "student", nullable: true })
  find(@Args() params: StudentArg) {
    return this.studentService.findOne(params);
  }
}
