import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string
        });
    }

    private sanitizeUser(user: User) {
        const { password, ...rest } = user;
        return rest;
    }

    async validate(payload: any) {
        const user = await this.usersService.findOneById(payload.sub);

        if(!user) {
            throw new UnauthorizedException();
        }

        return this.sanitizeUser(user);

        // return {
        //     userId: payload.sub,
        //     email: payload.email,
        //     phoneNumber: payload.phoneNumber,
        //     companyName: payload.companyName,
        //     role: payload.role
        // };
    }
}