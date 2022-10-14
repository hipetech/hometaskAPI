import { Body, Controller, Post, Put } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { Task } from "../schemas/task.schema";
import { TaskService } from "./task.service";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Controller("/task")
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(dto);
  }

  @Put()
  async editStatusById(@Body() dto: UpdateTaskDto): Promise<Task> {
    return this.taskService.editStatusById(dto);
  }

}
