import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document} from "mongoose";

import { Color } from "./color.schema";
import { Task } from "./task.schema";

export type SubjectSchema = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  name: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  toDO: Task[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  inProcess: Task[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  complete: Task[];

  @Prop([String])
  teachers: string[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Color"})
  colors: Color;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);