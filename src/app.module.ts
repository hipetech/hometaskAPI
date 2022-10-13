import { Module } from "@nestjs/common";
import { SubjectModule } from "./subject/subject.module";
import { ColorModule } from "./color/color.module";

@Module({
  imports: [SubjectModule, ColorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

