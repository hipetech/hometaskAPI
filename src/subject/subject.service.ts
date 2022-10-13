import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subject } from "../schemas/subject.schema";
import { Model } from "mongoose";

@Injectable()
export class SubjectService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<Subject>) {}

  async getAll(): Promise<Subject[]> {
    return this.subjectModel.find().populate("colors");
  }
}
