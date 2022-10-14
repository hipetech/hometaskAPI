import { ObjectId } from "mongoose";
import { TaskStatus } from "../types/TaskStatus";
import { IsEnum, IsMongoId } from "class-validator";

export class UpdateTaskDto {
  @IsMongoId()
  readonly id: ObjectId;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;
}