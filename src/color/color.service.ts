import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Color, ColorDocument } from "../schemas/color.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class ColorService {
  private readonly logger = new Logger(ColorService.name);
  constructor(@InjectModel(Color.name) private colorModel: Model<ColorDocument>) {}

  async getAll(): Promise<Color[]> {
    this.logger.log("using getAll");
    return this.colorModel.find();
  }

  async getById(id: ObjectId): Promise<Color> {
    this.logger.log("using getById");
    return this.colorModel.findById(id);
  }

}
