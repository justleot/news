import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { NewsService } from "./news.service";
import { CreateNewsDto } from "./dto/create-news.dto";
import { UpdateNewsDto } from "./dto/update-news.dto";
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { News } from "../entities/news.entity";
import { NewsResponseDto } from "./dto/news-response.dto";

@ApiTags("news")
@Controller("news")
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOkResponse({ type: () => News, isArray: true })
  findAll() {
    return this.newsService.getAllNews();
  }

  @ApiOkResponse({ type: () => News, isArray: false })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.newsService.getNewsById(id);
  }

  @ApiResponse({ type: NewsResponseDto, status: 201 })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() { user }, @Body() payload: CreateNewsDto) {
    return this.newsService.createNews(user, payload.text);
  }

  @ApiResponse({ type: NewsResponseDto, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Req() { user }, @Body() payload: UpdateNewsDto) {
    console.log(payload);
    return this.newsService.updateNews(user, payload);
  }

  @ApiResponse({ type: NewsResponseDto, status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: number, @Req() { user }) {
    return this.newsService.deleteNews(user, id);
  }
}
