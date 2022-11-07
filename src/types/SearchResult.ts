import { ObjectId } from "mongoose";
import { Color } from "../schemas/color.schema";

export interface SearchResult {
  name: string,
  subjectName: string,
  subjectId: ObjectId,
  colors: Color
}