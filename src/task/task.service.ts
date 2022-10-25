import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../schemas/task.schema";
import { Model, ObjectId } from "mongoose";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    this.logger.log("using create");
    return this.taskModel.create(dto);
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
