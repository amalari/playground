import { ObjectType } from "type-graphql";
import PaginatedResponse from "../../common/dto/paginated.response";
import { Challenge } from "../entity/challenge.entity";

@ObjectType()
export class ChallengesResponse extends PaginatedResponse(Challenge) {
  // you can add more fields here if you need
}
