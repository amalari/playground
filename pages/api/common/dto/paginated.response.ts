import { ClassType, Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class PaginationMeta {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  total: number;
}

export default function PaginatedResponse<TItemsFieldValue>(
  itemsFieldValue: ClassType<TItemsFieldValue> | String | Number | Boolean
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [itemsFieldValue])
    data: TItemsFieldValue[];

    @Field(() => PaginationMeta)
    meta: PaginationMeta;
  }
  return PaginatedResponseClass;
}
