import { Body, Controller, NotFoundException, Post, UnauthorizedException } from "@nestjs/common";
import { LoginUserDto } from "./validation/auth.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    async login(@Body() payload: LoginUserDto) {
        const user = await this.userService.getUser(payload.username);

        if (!user) {
            throw new NotFoundException();
        }

        const checkPassword: boolean = await this.authService.checkPassword(user.password, payload.password);

        if (!checkPassword){
            throw new UnauthorizedException();
        }

        const token = this.authService.signToken(user);

        return token;
    }
}