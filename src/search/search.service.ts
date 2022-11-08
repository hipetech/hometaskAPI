import { Injectable, Logger } from "@nestjs/common";
import { SubjectService } from "../subject/subject.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SearchResult } from "../types/SearchResult";
import { Subject } from "../schemas/subject.schema";
import { SearchDto } from "../dto/search.dto";
import { SearchSubject } from "../types/SearchSubject";
import { SearchType } from "../types/SearchType";

@Injectable()
export class SearchService {
  private logger = new Logger(SubjectService.name);

  private subjects: SearchSubject[];
  private results: SearchResult[];

  private readonly keys: string[];
  private readonly strings: string[];
  private readonly tasks: string[];

  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<Subject>,
  ) {
    this.results = [];
    this.keys = ["name"];
    this.strings = ["teachers"];
    this.tasks = ["toDo", "inProcess", "complete"];
  }

  private async getModelData(): Promise<Subject[]> {
    return this.subjectModel.find().populate(["toDo", "inProcess", "complete", "colors"]);
  }

  private isTermValid(term: string, subject: SearchSubject, itemName: string): void {
    if (itemName.toLowerCase().indexOf(term.toLowerCase()) > -1) {
      this.results = [...this.results,
        {
          name: itemName,
          subjectId: subject._id,
          colors: subject.colors,
          subjectName: subject.name,
        }];
    }
  }

  private validateTerm(subject: SearchSubject, key: string, term: string): void {
    const item = subject[key];

    if (item.length) {
      if (this.tasks.includes(key)) {
        item.forEach(elem => {
          this.isTermValid(term, subject, elem.name);
        });
      } else if (this.strings.includes(key)) {
        item.forEach(elem => {
          this.isTermValid(term, subject, elem);
        });
      } else {
        this.isTermValid(term, subject, item);
      }
    }
  }

  private searchForDfs(term: string): SearchResult[] {
    for (const subject of this.subjects) {
      for (const key of [...this.keys, ...this.tasks, ...this.strings]) {
        this.validateTerm(subject, key, term);
      }
    }
    return this.results;
  }

  private searchForBfs(term: string): SearchResult[] {
    for (const key of [...this.keys, ...this.strings, ...this.tasks]) {
      for (const subject of this.subjects) {
        this.validateTerm(subject, key, term);
      }
    }
    return this.results;
  }

  private async getSearchData(searchFor: () => SearchResult[]): Promise<SearchResult[]> {
    this.subjects = await this.getModelData();
    const res = searchFor();
    this.results = [];
    return res;
  }

  private async dfs(term: string): Promise<SearchResult[]> {
    this.logger.log("using depth-first search");
    return this.getSearchData(() => this.searchForDfs(term));
  }

  private async bfs(term: string): Promise<SearchResult[]> {
    this.logger.log("using breadth-first search");
    return this.getSearchData(() => this.searchForBfs(term));
  }

  public async search(dto: SearchDto): Promise<SearchResult[]> {
    switch (dto.searchType) {
      case SearchType.dfs:
        return this.dfs(dto.term);
      case SearchType.bfs:
        return this.bfs(dto.term);
    }
  }
}
