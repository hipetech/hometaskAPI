import { TaskStatus } from "../types/TaskStatus";
import { IsEnum, IsMongoId, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateTaskDto {
  @IsString()
  readonly name: string;

  @IsMongoId()
  readonly subject: ObjectId;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}