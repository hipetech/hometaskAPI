import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document} from "mongoose";

import { Color } from "./color.schema";

export type SubjectSchema = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  name: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  toDo: mongoose.Types.ObjectId[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  inProcess: mongoose.Types.ObjectId[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]})
  complete: mongoose.Types.ObjectId[];

  @Prop([String])
  teachers: string[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Color"})
  colors: Color;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);