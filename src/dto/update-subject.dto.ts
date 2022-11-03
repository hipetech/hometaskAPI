import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class UpdateSubjectDto {
  @IsMongoId()
  readonly _id: string;

  @IsMongoId({ each: true })
  readonly toDo: ObjectId[];

  @IsMongoId({ each: true })
  readonly inProcess: ObjectId[];

  @IsMongoId({ each: true })
  readonly complete: ObjectId[];
}