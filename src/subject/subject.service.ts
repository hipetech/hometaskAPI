import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Subject } from "../schemas/subject.schema";
import { Model, ObjectId } from "mongoose";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { Task } from "../schemas/task.schema";


@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
    @InjectModel(Task.name) private taskModel: Model<Task>
  ) {}

  async create(dto: CreateSubjectDto): Promise<Subject> {
    return this.subjectModel.create(dto);
  }

  async delete(id: ObjectId): Promise<Subject> {
    return this.subjectModel.findByIdAndDelete(id);
  }

  async getAll(): Promise<Subject[]> {
    return this.subjectModel.find().populate(["colors", "tasks"]);
  }

  async getById(id: ObjectId): Promise<Subject> {
    return this.subjectModel.findById(id).populate("colors");
  }
}
