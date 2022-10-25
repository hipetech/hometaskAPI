import { Module } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, TaskSchema } from "../schemas/task.schema";
import { Subject, SubjectSchema } from "../schemas/subject.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {
}
