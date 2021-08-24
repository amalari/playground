import { JsonDB } from "node-json-db";
import { Config } from "node-json-db/dist/lib/JsonDBConfig";
import { Service } from "typedi";
import * as _ from "lodash";
import { CreateChallengeInput } from "./dto/create-challenge.input";
import { Challenge } from "./entity/challenge.entity";
import { GradingStatus } from "./enums/grading";
import { UpdateChallengeInput } from "./dto/update-challenge.input";
import { StudentService } from "../student/student.service";
import { SetReviewerChallengeInput } from "./dto/set-reviewer-challenge.input";
import { SetGradeChallengeInput } from "./dto/set-grade-challenge.input";

@Service()
export class ChallengeService {
  private challengeModel;
  private challengeName = process.cwd() + "\\pages\\api\\challenge\\challenge";

  constructor(private readonly studentService: StudentService) {
    this.challengeModel = new JsonDB(
      new Config(this.challengeName, true, false)
    );
  }

  private getData() {
    let data = this.challengeModel.getData("/");

    return _.isEmpty(data) ? [] : data;
  }

  private setData(data) {
    this.challengeModel.push(this.challengeName, data, true);
  }

  create(challenge: CreateChallengeInput): Challenge {
    let data = this.getData();
    const id =
      data.length > 0 ? String(Number(data[data.length - 1].id) + 1) : "1";
    const newChallenge = {
      ...challenge,
      gradingStatus: GradingStatus.UNSUBMITTED,
      grade: null,
      reviewerId: null,
      id,
    };
    data.push(newChallenge);
    this.setData(data);

    return newChallenge as Challenge;
  }

  update(id: string, challenge: UpdateChallengeInput): Challenge {
    let data = this.getData();
    const index = _.findIndex(data, { id });
    const newChallenge = {
      ...data[index],
      ...challenge,
    };
    data[index] = newChallenge;
    this.setData(data);

    return newChallenge;
  }

  submitChallenge(id: string): Challenge {
    let data = this.getData();
    const index = _.findIndex(data, { id });
    const newChallenge = {
      ...data[index],
      gradingStatus: GradingStatus.SUBMITTED,
    };
    data[index] = newChallenge;
    this.setData(data);

    return newChallenge;
  }

  setReviewer(input: SetReviewerChallengeInput): Challenge {
    let data = this.getData();
    const index = _.findIndex(data, { id: input.id });
    const newChallenge = {
      ...data[index],
      reviewerId: input.reviewerId,
    };
    data[index] = newChallenge;
    this.setData(data);

    return newChallenge;
  }

  setGrade(input: SetGradeChallengeInput): Challenge {
    let data = this.getData();
    const index = _.findIndex(data, { id: input.id });
    const newChallenge = {
      ...data[index],
      grade: input.grade,
      gradingStatus:
        input.grade == 5
          ? GradingStatus.GRADE_FAILED
          : GradingStatus.GRADE_PASSED,
    };
    data[index] = newChallenge;
    this.setData(data);

    return newChallenge;
  }

  remove(id: string): Boolean {
    let data = this.getData();
    const index = _.findIndex(data, { id });
    data.splice(index, 1);
    this.setData(data);

    return true;
  }

  findOne({ filter = {} }): Challenge {
    const finalFIlter = _.pickBy(filter, (v) => v !== undefined);
    let data = this.getData();
    const challenge = _.find(data, finalFIlter);
    challenge.student = this.studentService.findOne({
      filter: { id: challenge.studentId },
    });
    challenge.reviewer = this.studentService.findOne({
      filter: { id: challenge.reviewerId },
    });
    return challenge;
  }

  findAndCountAll({ filter = {}, page, limit }): {
    count: number;
    data: Challenge[];
  } {
    const studentsHashMap = {};
    for (const student of this.studentService.findAll({})) {
      studentsHashMap[student.id] = student;
    }
    const finalFIlter = _.pickBy(filter, (v) => v !== undefined);
    let data = this.getData();
    const query = filter ? _.chain(data).filter(finalFIlter) : _.chain(data);
    const count = query.value().length;
    data = query
      .drop((page - 1) * limit)
      .take(limit)
      .value();
    data = data.map((obj) => ({
      ...obj,
      student: studentsHashMap[obj.studentId],
      reviewer: studentsHashMap[obj.reviewerId],
    }));

    return { count, data };
  }
}
