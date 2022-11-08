import { ObjectId } from "mongoose";
import { Color } from "../schemas/color.schema";

export interface SearchResult {
  name: string,
  subjectId: ObjectId,
  subjectName: string,
  colors: Color
}