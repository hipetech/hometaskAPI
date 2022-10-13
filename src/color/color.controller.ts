import { Controller, Get, Param } from "@nestjs/common";
import { ColorService } from "./color.service";
import { Color } from "../schemas/color.schema";
import { ObjectId } from "mongoose";


@Controller("/color")
export class ColorController {

  constructor(private colorService: ColorService) {}

  @Get()
  async getAll(): Promise<Color[]> {
    return this.colorService.getAll();
  }

  @Get(":id")
  async getById(@Param("id") id: ObjectId): Promise<Color> {
    return this.colorService.getById(id);
  }
}
