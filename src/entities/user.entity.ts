import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { News } from "./news.entity";
import { ApiHideProperty } from "@nestjs/swagger";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, primary: true })
  email: string;

  @ApiHideProperty()
  @Column()
  password: string;

  @OneToMany(() => News, (news) => news.user)
  news: News[];
}
