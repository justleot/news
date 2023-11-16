import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { RefreshStrategy } from "./strategies/refresh.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      signOptions: {
        algorithm: "HS512",
      },
    }),
  ],
})
export class AuthModule {}
