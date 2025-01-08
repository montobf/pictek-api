import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profil } from './profil.entity';
import { ProfilService } from './profile.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profil])
    ],
    providers: [ProfilService],
    exports: [ProfilService]
})
export class ProfilModule {}
