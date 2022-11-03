import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { SubjectService } from "./subject.service";
import { Subject } from "../schemas/subject.schema";
import { ObjectId } from "mongoose";
import { CreateSubjectDto } from "../dto/create-subject.dto";
import { UpdateSubjectDto } from "../dto/update-subject.dto";

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

  @Put()
  async update(@Body() dto: UpdateSubjectDto): Promise<Subject> {
    return this.subjectService.update(dto);
  }
}
