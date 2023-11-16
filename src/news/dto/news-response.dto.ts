import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../entities/user.entity";

export class NewsResponseDto {
  @ApiProperty({
    example: "Текст новости",
    description: "Текст новости",
  })
  text: string;
  @ApiProperty({
    example: 3,
    description: "Уникальный идентификатор новости",
  })
  id: number;

  @ApiProperty({
    example: "2021-08-08T12:00:00.000Z",
    description: "Дата создания новости",
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: "2021-08-08T12:00:00.000Z",
    description: "Дата обновления новости",
    type: String,
  })
  updatedAt: string;

  user: User;
}
