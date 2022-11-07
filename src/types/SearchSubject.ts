
import { Task } from "../schemas/task.schema";
import mongoose, { ObjectId } from "mongoose";
import { Color } from "../schemas/color.schema";

export interface SearchSubject {
  _id?: ObjectId,
  name: string,
  teachers: string[]
  toDo: Task[] | mongoose.Types.ObjectId[],
  inProcess: Task[] | mongoose.Types.ObjectId[],
  complete: Task[] | mongoose.Types.ObjectId[],
  colors: Color
}