import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "ismail@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export class LoginUserDto {
  @ApiProperty({ example: "ismail@gmail.com" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
