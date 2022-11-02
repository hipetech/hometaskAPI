import { IsMongoId } from "class-validator";
import { ObjectId } from "mongoose";

export class DeleteTaskDto {
  @IsMongoId()
  readonly _id: string;

  @IsMongoId()
  readonly subject: ObjectId;
}