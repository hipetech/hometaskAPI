import { IsMongoId } from "class-validator";
import mongoose, { ObjectId } from "mongoose";

export class DeleteTaskDto {
  @IsMongoId()
  readonly _id: mongoose.Types.ObjectId;

  @IsMongoId()
  readonly subject: ObjectId;
}