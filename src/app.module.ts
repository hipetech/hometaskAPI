import { Module } from "@nestjs/common";
import { SubjectModule } from "./subject/subject.module";
import { ColorModule } from "./color/color.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TaskModule } from "./task/task.module";


@Module({
  imports: [
    SubjectModule,
    ColorModule,
    TaskModule,
    MongooseModule.forRoot("mongodb://localhost:27017/hometaskTracker"),
  ],
})
export class AppModule {
}

