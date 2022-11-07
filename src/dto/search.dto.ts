import { IsEnum, IsString } from "class-validator";
import { SearchType } from "../types/SearchType";

export class SearchDto {
  @IsString()
  term: string;

  @IsEnum(SearchType)
  searchType: SearchType;
}