import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import * as process from "process";
import { UsersModule } from "./users/users.module";
import { NewsModule } from "./news/news.module";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      // не использовать в продакшине
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    AuthModule,
    UsersModule,
    NewsModule,
  ],
})
export class AppModule {}
