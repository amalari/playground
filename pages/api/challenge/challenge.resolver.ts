import {
  Arg,
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Student } from "../student/entity/student.entity";
import { ChallengeService } from "./challenge.service";
import { ChallengeArg } from "./dto/challenge.arg";
import { ChallengesArg } from "./dto/challenges.arg";
import { ChallengesResponse } from "./dto/challenges.response";
import { CreateChallengeInput } from "./dto/create-challenge.input";
import { SetGradeChallengeInput } from "./dto/set-grade-challenge.input";
import { SetReviewerChallengeInput } from "./dto/set-reviewer-challenge.input";
import { UpdateChallengeInput } from "./dto/update-challenge.input";
import { Challenge } from "./entity/challenge.entity";

@Resolver((of) => Challenge)
@Service()
export class ChallengeResolver {
  constructor(
    // constructor injection of a service
    private readonly challengeService: ChallengeService
  ) {}

  @Mutation(() => Challenge, { name: "createChallenge" })
  create(@Arg("input") input: CreateChallengeInput) {
    return this.challengeService.create(input);
  }

  @Mutation(() => Challenge, { name: "updateChallenge" })
  update(@Arg("input") input: UpdateChallengeInput) {
    return this.challengeService.update(input.id, input);
  }

  @Mutation(() => Boolean, { name: "removeChallenge" })
  remove(@Arg("id") id: string) {
    return this.challengeService.remove(id);
  }

  @Mutation(() => Challenge, { name: "submitChallenge" })
  submitChallenge(@Arg("id") id: string) {
    return this.challengeService.submitChallenge(id);
  }

  @Mutation(() => Challenge, { name: "setReviewer" })
  setReviewer(@Arg("input") input: SetReviewerChallengeInput) {
    return this.challengeService.setReviewer(input);
  }

  @Mutation(() => Challenge, { name: "setGrade" })
  setGrade(@Arg("input") input: SetGradeChallengeInput) {
    return this.challengeService.setGrade(input);
  }

  @Query(() => ChallengesResponse, { name: "challenges" })
  findAll(@Args() params: ChallengesArg) {
    const { data, count } = this.challengeService.findAndCountAll(params);
    return {
      data,
      meta: {
        page: params.page,
        limit: params.limit,
        total: count,
      },
    };
  }

  @Query(() => Challenge, { name: "challenge", nullable: true })
  find(@Args() params: ChallengeArg) {
    return this.challengeService.findOne(params);
  }
}
