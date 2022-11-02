import { ObjectId } from "mongoose";
import { IsMongoId, IsString} from "class-validator";



export class CreateSubjectDto {
  @IsString()
  readonly name: string;

  @IsMongoId({each: true})
  readonly toDO: ObjectId[];

  @IsMongoId({each: true})
  readonly inProcess: ObjectId[];

  @IsMongoId({each: true})
  readonly complete: ObjectId[];

  @IsString({ each: true })
  readonly teachers: string[];

  @IsMongoId()
  readonly colors: ObjectId;
}