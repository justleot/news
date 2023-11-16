import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("news")
export class News {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор новости",
    type: Number,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "2021-08-08T12:00:00.000Z",
    description: "Дата создания новости",
    type: String,
  })
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty({
    example: "2021-08-08T12:00:00.000Z",
    description: "Дата обновления новости",
    type: String,
  })
  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => User, (user) => user.news, { onDelete: "CASCADE" })
  user: User;

  @ApiProperty({
    example: "Текст новости",
    description: "Текст новости",
    type: String,
  })
  @Column()
  text: string;
}
