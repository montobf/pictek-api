import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async createUser(user: User): Promise<User> {
        return await this.userRepository.save({
            ...user
        })
    }

    public async getUser(username: string): Promise<User> {
        return await this.userRepository.findOne({
            where: [
                { username: username}
            ],
            relations: {
                profiles: true
            }
        })
    }
}