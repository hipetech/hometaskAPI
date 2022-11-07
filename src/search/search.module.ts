import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Subject, SubjectSchema } from "../schemas/subject.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Subject.name, schema: SubjectSchema}])
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {
}
