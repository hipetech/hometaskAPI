import { Task } from "../types/Task";
import { ObjectId } from "mongoose";

export class CreateSubjectDto {
  readonly name: string;
  readonly tasks: Task[];
  readonly teachers: string[];
  readonly color: ObjectId;
}