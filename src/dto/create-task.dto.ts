import { TaskStatus } from "../types/TaskStatus";
import { IsEnum, IsMongoId, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsMongoId()
  subject: ObjectId;

  @IsEnum(TaskStatus)
  status: TaskStatus;
}