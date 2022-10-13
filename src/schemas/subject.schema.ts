import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document} from "mongoose";
import {Task} from "../types/Task";
import { Color } from "./color.schema";

export type SubjectSchema = Subject & Document;

@Schema()
export class Subject {
  @Prop()
  name: string;

  @Prop([Task])
  tasks: Task[];

  @Prop([String])
  teachers: string[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Color"})
  colors: Color;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);