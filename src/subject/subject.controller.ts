import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Subject } from "../schemas/subject.schema";
import { ObjectId } from "mongoose";
import { CreateSubjectDto } from "../dto/create-subject.dto";

@Controller("/subject")
export class SubjectController {
  constructor(private subjectService: SubjectService) {
  }

  @Post()
  async create(@Body() dto: CreateSubjectDto): Promise<Subject> {
    return this.subjectService.create(dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: ObjectId): Promise<Subject> {
    return this.subjectService.delete(id);
  }

  @Get()
  async getAll(): Promise<Subject[]> {
    return this.subjectService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: ObjectId): Promise<Subject> {
    return this.subjectService.getById(id);
  }
}
