import { Controller, Get } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Subject } from "../schemas/subject.schema";

@Controller("/subject")
export class SubjectController {
  constructor(private subjectService: SubjectService) {}

  @Get()
  async getAll(): Promise<Subject[]> {
    return this.subjectService.getAll();
  }
}
