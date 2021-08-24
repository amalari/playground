import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Service } from "typedi";
import * as _ from "lodash";
import { Student } from "./entity/student.entity";
import { CreateStudentInput } from "./dto/create-student.input";
import { UpdateStudentInput } from "./dto/update-student.input";

@Service()
export class StudentService {
  private studentModel;
  private studentName = process.cwd() + "\\pages\\api\\student\\student";

  constructor() {
    this.studentModel = new JsonDB(new Config(this.studentName, true, false));
  }

  private getData() {
    let data = this.studentModel.getData("/");

    return _.isEmpty(data) ? [] : data;
  }

  private setData(data) {
    this.studentModel.push(this.studentName, data, true);
  }

  findAndCountAll({ filter = {}, page, limit }): {
    count: number;
    data: Student[];
  } {
    const finalFIlter = _.pickBy(filter, (v) => v !== undefined);
    let data = this.getData();
    const query = filter ? _.chain(data).filter(finalFIlter) : _.chain(data);
    const count = query.value().length;
    data = query
      .drop((page - 1) * limit)
      .take(limit)
      .value();

    return { count, data };
  }

  findOne({ filter = {} }): Student {
    const finalFIlter = _.pickBy(filter, (v) => v !== undefined);
    let data = this.getData();
    return _.find(data, finalFIlter);
  }

  create(student: CreateStudentInput): Student {
    let data = this.getData();
    console.log({ data });
    const id =
      data.length > 0 ? String(Number(data[data.length - 1].id) + 1) : "1";
    const newStudent = {
      ...student,
      id,
    };
    data.push(newStudent);
    this.setData(data);
    return newStudent;
  }

  update(id: string, student: UpdateStudentInput): Student {
    let data = this.getData();
    const index = _.findIndex(data, { id });
    const newStudent = {
      ...data[index],
      ...student,
    };
    data[index] = newStudent;
    this.setData(data);
    return newStudent;
  }

  remove(id: string): Boolean {
    let data = this.getData();
    const index = _.findIndex(data, { id });
    data.splice(index, 1);
    this.setData(data);

    return true;
  }
}
