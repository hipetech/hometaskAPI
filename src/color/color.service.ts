import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Color, ColorDocument } from "../schemas/color.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class ColorService {
  constructor(@InjectModel(Color.name) private colorModel: Model<ColorDocument>) {}

  async getAll(): Promise<Color[]> {
    return this.colorModel.find();
  }

  async getById(id: ObjectId): Promise<Color> {
    return this.colorModel.findById(id);
  }

}
