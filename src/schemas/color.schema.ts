import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";

export type ColorDocument = Color & Document;

@Schema()
export class Color {
  @Prop()
  backgroundColor: string;

  @Prop()
  fontColor: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);