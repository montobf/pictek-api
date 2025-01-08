import { BadRequestException, Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { CreateUserDto } from "./validation/user.dto";
import { setUser } from "./setter";
import { UserService } from "./user.service";
import { ProfilService } from "src/profil/profile.service";

@Controller('user')

export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfilService
    ) {}

    @Post('create')
    async createUser(@Body() payload: CreateUserDto){
        const existingUser = await this.userService.getUser(payload.username);

        if (existingUser) {
            throw new BadRequestException(['user already existing']);
        }

        const clientProfile = await this.profileService.getProfile('Client');

        if (!clientProfile) {
            throw new NotFoundException(['Profile non trouvé']);
        }

        const user = await setUser(existingUser, clientProfile);

        return {
            ...(await this.userService.createUser(user))
        }
    }
}