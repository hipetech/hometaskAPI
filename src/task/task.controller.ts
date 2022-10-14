import { Body, Controller, Post } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Task } from "../schemas/task.schema";
import { TaskService } from "./task.service";

@Controller("/task")
export class TaskController {
  constructor(private taskService: TaskService) {
  }
  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(dto);
  }
}
