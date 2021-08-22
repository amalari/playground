import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { CreateStudentInput } from "./dto/create-student.input";
import { StudentArg } from "./dto/student.arg";
import { StudentsArg } from "./dto/students.arg";
import { StudentsResponse } from "./dto/students.response";
import { UpdateStudentInput } from "./dto/update-student.input";
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

  @Mutation(() => Student, { name: "createStudent" })
  create(@Arg("input") input: CreateStudentInput) {
    return this.studentService.create(input);
  }

  @Mutation(() => Student, { name: "updateStudent" })
  update(@Arg("input") input: UpdateStudentInput) {
    return this.studentService.update(input.id, input);
  }

  @Mutation(() => Boolean, { name: "removeStudent" })
  remove(@Arg("id") id: string) {
    return this.studentService.remove(id);
  }
}
