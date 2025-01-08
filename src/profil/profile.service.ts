import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profil } from "./profil.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfilService {
    constructor(
        @InjectRepository(Profil)
        private readonly profileRepository: Repository<Profil>
    ) {}

    public async getProfile(name: string): Promise<Profil> {
        return await this.profileRepository.findOne({
            where: [
                { name: name}
            ]
        });
    }
}