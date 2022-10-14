import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document} from "mongoose";
import { TaskStatus } from "../types/TaskStatus";
import { Subject } from "./subject.schema";

export type TaskSchema = Task & Document;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop(() => TaskStatus)
  status: TaskStatus;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Subject"})
  subject: Subject;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
