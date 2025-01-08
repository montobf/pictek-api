import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    username: string;
    @IsEmail()
    mail: string;
    @Length(8)
    password: string;
}

