import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subject } from "../schemas/subject.schema";
import { Model, ObjectId } from "mongoose";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { Task } from "../schemas/task.schema";


@Injectable()
export class SubjectService {
  private logger = new Logger(SubjectService.name);
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    this.logger.log("using create");
    return this.subjectModel.create(dto);
  }

  async delete(id: ObjectId): Promise<Subject> {
    this.logger.log("using delete");
    return this.subjectModel.findByIdAndDelete(id);
  }

  async getAll(): Promise<Subject[]> {
    this.logger.log("using getAll");
    return this.subjectModel.find().populate("colors");
  }

  async getById(id: ObjectId): Promise<Subject> {
    this.logger.log("using getById");
    return this.subjectModel.findById(id).populate(["colors", "toDO", "inProcess", "complete"]);
  }
}
