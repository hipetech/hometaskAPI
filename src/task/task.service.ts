import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "../schemas/task.schema";
import mongoose, { Model, ObjectId } from "mongoose";
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

  private async switchStatus(
    _id: ObjectId,
    status: TaskStatus,
    toDo: mongoose.Types.ObjectId[],
    inProgress: mongoose.Types.ObjectId[],
    complete: mongoose.Types.ObjectId[],
  ): Promise<void> {
    switch (status) {
      case TaskStatus.toDo:
        await this.subjectModel.findByIdAndUpdate(_id, { toDo: toDo });
        break;
      case TaskStatus.inProcess:
        await this.subjectModel.findByIdAndUpdate(_id, { inProgress: inProgress });
        break;
      case TaskStatus.complete:
        await this.subjectModel.findByIdAndUpdate(_id, { complete: complete });
        break;
    }
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    this.logger.log("using create");
    const taskResult = await this.taskModel.create(dto);
    const subject = await this.subjectModel.findById(dto.subject);

    await this.switchStatus(
      dto.subject,
      dto.status,
      [...subject.toDo, taskResult._id],
      [...subject.inProcess, taskResult._id],
      [...subject.complete, taskResult._id],
    );

    return taskResult;
  }

  async editStatusById(dto: UpdateTaskDto): Promise<Task> {
    this.logger.log("use editStatusById");
    return this.taskModel.findOneAndUpdate({ _id: dto._id }, { status: dto.status });
  }

  private deleteArray(array: mongoose.Types.ObjectId[], id: mongoose.Types.ObjectId): mongoose.Types.ObjectId[] {
    return array.filter(taskId => {
      if (taskId !== id) return taskId;
    });
  }

  async deleteById(dto: DeleteTaskDto): Promise<Task> {
    this.logger.log("use deleteById");
    const taskResult = await this.taskModel.findByIdAndDelete(dto._id);
    const subject = await this.subjectModel.findById(dto.subject);

    await this.switchStatus(
      dto.subject,
      taskResult.status,
      this.deleteArray(subject.toDo, taskResult._id),
      this.deleteArray(subject.inProcess, taskResult._id),
      this.deleteArray(subject.complete, taskResult._id)
    );

    return taskResult;
  }
}