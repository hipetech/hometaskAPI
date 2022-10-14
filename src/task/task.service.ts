import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../schemas/task.schema";
import { Model } from "mongoose";
import { CreateTaskDto } from "../dto/create-task.dto";

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create(dto);
  }
}
