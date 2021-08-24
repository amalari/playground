import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ChallengeService } from "./challenge.service";
import { ChallengeArg } from "./dto/challenge.arg";
import { ChallengesArg } from "./dto/challenges.arg";
import { ChallengesResponse } from "./dto/challenges.response";
import { CreateChallengeInput } from "./dto/create-challenge.input";
import { UpdateChallengeInput } from "./dto/update-student.input";
import { Challenge } from "./entity/challenge.entity";

@Resolver()
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
