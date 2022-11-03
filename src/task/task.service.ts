import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../schemas/task.schema";
import { Model } from "mongoose";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { Subject } from "../schemas/subject.schema";
import { DeleteTaskDto } from "../dto/delete-task.dto";
import { TaskStatus } from "src/types/TaskStatus";

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

    switch (dto.status) {
      case TaskStatus.toDo:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { toDo: [...subject.toDo, taskResult._id] });
        break;
      case TaskStatus.inProcess:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { inProcess: [...subject.inProcess, taskResult._id] });
        break;
      case TaskStatus.complete:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { complete: [...subject.complete, taskResult._id] });
        break;
    }


    return taskResult;
  }

  async editStatusById(dto: UpdateTaskDto): Promise<Task> {
    this.logger.log("use editStatusById");
    return this.taskModel.findOneAndUpdate({ _id: dto._id }, { status: dto.status });
  }

  async deleteById(dto: DeleteTaskDto): Promise<Task> {
    this.logger.log("use deleteById");
    const taskResult = await this.taskModel.findByIdAndDelete(dto._id);
    const subject = await this.subjectModel.findById(dto.subject);

    const removeArr = (arr): any => {
      return arr.filter((taskId) => {
        if (String(taskId) !== String(taskResult._id)) {
          return taskId;
        }
      });
    };

    switch (taskResult.status) {
      case TaskStatus.toDo:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { toDo: removeArr(subject.toDo)});
        break;
      case TaskStatus.inProcess:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { inProcess: removeArr(subject.inProcess) });
        break;
      case TaskStatus.complete:
        await this.subjectModel.findByIdAndUpdate(dto.subject, { complete: removeArr(subject.complete) });
        break;
    }

    return taskResult;
  }
}