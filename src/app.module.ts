import { Module } from "@nestjs/common";
import { SubjectModule } from "./subject/subject.module";
import { ColorModule } from "./color/color.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    SubjectModule,
    ColorModule,
    MongooseModule.forRoot("mongodb://localhost:27017/hometaskTracker")
  ]
})
export class AppModule {}

