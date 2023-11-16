import { ApiProperty } from "@nestjs/swagger";

export class CredentialsResponseDto {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    description: "Используется для авторизации пользователя",
  })
  accessToken: string;
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    description: "Используется для обновления accessToken, действителен 3 дня",
  })
  refreshToken: string;
}
