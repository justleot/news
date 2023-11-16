import { BadRequestException, Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
import { CreateUserDto, LoginUserDto } from "./dto";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as crypto from "crypto";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signUn(payload: CreateUserDto) {
    // делаем поиск по базе пользователей с таким email
    const isUserExists = await this.usersRepository.count({
      where: {
        email: payload.email,
      },
    });

    // если пользователь найден, то выбрасываем ошибку
    if (isUserExists) throw new BadRequestException("User already exists");

    // формируем хеш из пароля
    const password = crypto
      .createHash("sha256")
      .update(payload.password)
      .digest("hex");

    // сохраняем пользователя в базу
    const { id, email } = await this.usersRepository.save({
      email: payload.email,
      password,
    });

    const accessTokenPayload = { id, email };

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.getOrThrow<string>("JWT_EXPIRATION_TIME"),
        secret: this.configService.getOrThrow<string>("JWT_SECRET"),
      }),
      refreshToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.getOrThrow<string>(
          "JWT_REFRESH_EXPIRATION_TIME"
        ),
        secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      }),
    };
  }

  async singIn(payload: LoginUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        email: payload.email,
        password: crypto
          .createHash("sha256")
          .update(payload.password)
          .digest("hex"),
      },
    });

    if (!user) throw new BadRequestException("Bad credentials");

    const accessTokenPayload = { id: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.getOrThrow<string>("JWT_EXPIRATION_TIME"),
        secret: this.configService.getOrThrow<string>("JWT_SECRET"),
      }),
      refreshToken: await this.jwtService.signAsync(accessTokenPayload, {
        expiresIn: this.configService.getOrThrow<string>(
          "JWT_REFRESH_EXPIRATION_TIME"
        ),
        secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
      }),
    };
  }

  async refresh(user: User & { refreshToken: string }) {
    return {
      accessToken: await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: this.configService.getOrThrow<string>(
            "JWT_EXPIRATION_TIME"
          ),
          secret: this.configService.getOrThrow<string>("JWT_SECRET"),
        }
      ),
      refreshToken: user.refreshToken,
    };
  }
}
