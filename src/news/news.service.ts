import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "../entities/news.entity";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UpdateNewsDto } from "./dto/update-news.dto";

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>
  ) {}

  async getAllNews() {
    return await this.newsRepository.find();
  }

  async getNewsById(id: number) {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) throw new NotFoundException("News not found");
    return news;
  }

  async createNews(user: User, text: string) {
    const news = await this.newsRepository.save({
      user,
      text,
    });

    delete news.user;

    return news;
  }

  async updateNews(user: User, { id, text }: UpdateNewsDto) {
    const news = await this.newsRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!news) throw new NotFoundException("News not found");

    return this.newsRepository.save({
      ...news,
      text,
    });
  }

  async deleteNews(user: User, id: number) {
    const news = await this.newsRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!news) throw new NotFoundException("News not exist");

    await this.newsRepository.delete({
      id,
      user,
    });

    return news;
  }
}
