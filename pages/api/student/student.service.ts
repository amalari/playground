import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Service } from "typedi";
import * as _ from "lodash";
import { Student } from "./entity/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";

@Service()
export class StudentService {
  private studentModel;
  private studentName = "student";

  constructor() {
    this.studentModel = new JsonDB(new Config(this.studentName, true, false));
  }

  private getData() {
    let data = this.studentModel.getData("/");

    return _.isEmpty(data) ? [] : data;
  }

  findAndCountAll({ filter = {}, page, limit }): {
    count: number;
    data: Student[];
  } {
    let data = this.getData();
    const query = filter ? _.chain(data).filter(filter) : _.chain(data);
    const count = query.value().length;
    data = query
      .drop((page - 1) * limit)
      .take(limit)
      .value();

    return { count, data };
  }

  findOne({ filter = {} }): Student {
    let data = this.getData();
    return _.find(data, filter);
  }

  create(student: CreateStudentInput): Student {
    let data = this.getData();
    const id =
      data.length > 0 ? String(Number(data[data.length - 1].id) + 1) : "1";
    const newStudent = {
      ...student,
      id,
    };
    data.push(newStudent);
    this.studentModel.push(this.studentName, data, true);
    return newStudent;
  }
}
