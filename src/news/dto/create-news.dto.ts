import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
  @ApiProperty({ example: "Текст новости", description: "Текст новости" })
  @IsString()
  @IsNotEmpty()
  text: string;
}
