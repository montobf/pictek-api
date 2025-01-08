import { Profil } from "src/profil/profil.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    username: string;
    @Column()
    mail: string;
    @Column()
    password: string;
    @ManyToMany(() => Profil)
    @JoinTable()
    profiles: Profil[];
}