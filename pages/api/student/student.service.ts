import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Service } from "typedi";

@Service()
export class StudenteService {
  private studentModel;
  constructor() {
    this.studentModel = new JsonDB(new Config("student", true, false));
  }

  findAndCountAll() {
    return this.studentModel.getData("/");
  }
}
