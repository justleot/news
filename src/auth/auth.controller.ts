import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto, LoginUserDto } from "./dto";
import { AuthService } from "./auth.service";
import { RefreshAuthGuard } from "./guards/refresh-auth.guard";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CredentialsResponseDto } from "./dto/credentials-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Метод используется для регистрации пользователя
   */
  @ApiCreatedResponse({ type: CredentialsResponseDto })
  @HttpCode(201)
  @Post("sign-up")
  signUp(@Body() payload: CreateUserDto): Promise<CredentialsResponseDto> {
    return this.authService.signUn(payload);
  }

  /**
   * Метод используется для авторизации пользователя
   */
  @ApiResponse({ type: CredentialsResponseDto, status: 200 })
  @Post("sign-in")
  signIn(@Body() payload: LoginUserDto): Promise<CredentialsResponseDto> {
    return this.authService.singIn(payload);
  }

  /**
   * Метод используется для обновления токена
   */
  @ApiBearerAuth("refresh_token")
  @UseGuards(RefreshAuthGuard)
  @ApiResponse({ type: CredentialsResponseDto, status: 200 })
  @Get("refresh")
  refresh(@Req() { user }) {
    return this.authService.refresh(user);
  }
}
