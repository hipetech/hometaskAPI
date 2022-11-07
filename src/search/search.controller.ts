import { Body, Controller, Post } from "@nestjs/common";
import { SearchDto } from "../dto/search.dto";
import { SearchService } from "./search.service";
import { SearchResult } from "../types/SearchResult";

@Controller("/search")
export class SearchController {
  constructor(private searchService: SearchService) {
  }

  @Post()
  async search(@Body() dto: SearchDto): Promise<SearchResult[]> {
    return this.searchService.search(dto);
  }
}
