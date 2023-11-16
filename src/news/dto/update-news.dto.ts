import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNewsDto {
  @ApiProperty({ example: "Текст новости", description: "Текст новости" })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 26, description: "Уникальный идентификатор новости" })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

//export class CreateNewsDto {
//   @ApiProperty({ example: "Текст новости" })
//   @IsString()
//   @IsNotEmpty()
//   text: string;
// }
