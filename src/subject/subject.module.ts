import { Module } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { SubjectController } from "./subject.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Subject, SubjectSchema } from "../schemas/subject.schema";
import { Task, TaskSchema } from "../schemas/task.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Subject.name, schema: SubjectSchema}]),
    MongooseModule.forFeature([{name: Task.name, schema: TaskSchema}])
  ],
  providers: [SubjectService],
  controllers: [SubjectController]
})
export class SubjectModule {}
