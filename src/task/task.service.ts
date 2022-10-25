import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../schemas/task.schema";
import { Model, ObjectId } from "mongoose";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Subject } from "../schemas/subject.schema";

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    this.logger.log("using create");
    const taskResult = await this.taskModel.create(dto);
    const subject = await this.subjectModel.findById(dto.subject);
    await this.subjectModel.findOneAndUpdate(dto.subject, { tasks: [...subject.tasks, taskResult._id] });
    return taskResult;
  }

  async editStatusById(dto: UpdateTaskDto): Promise<Task> {
    this.logger.log("use editStatusById");
    return this.taskModel.findOneAndUpdate({ _id: dto.id }, { status: dto.status });
  }

  async deleteById(id: ObjectId): Promise<Task> {
    this.logger.log("use deleteById");
    return this.taskModel.findByIdAndDelete(id);
  }
}
