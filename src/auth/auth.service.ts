import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { User } from "src/user/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ){}

    public async checkPassword(userPassword, passwordPayload): Promise<boolean>{
        return await bcrypt.compare(passwordPayload, userPassword);
    }

    public signToken(user: User){
        const token = this.jwtService.sign({
            username: user.username,
            sub: user.id,
            profiles: [...user.profiles]
        });

        return {
            userId: user.id,
            token
        }
    }

    public async validateToken(token: string) {
        return await this.jwtService.verifyAsync(
            token,
            {
                secret: process.env.AUTH_SECRET,
                ignoreExpiration: false
            }
        );
    }
}