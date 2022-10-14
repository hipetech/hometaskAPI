import { ObjectId } from "mongoose";
import { IsMongoId, IsString} from "class-validator";



export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsMongoId({each: true})
  tasks: ObjectId[];

  @IsString({ each: true })
  teachers: string[];

  @IsMongoId()
  colors: ObjectId;
}