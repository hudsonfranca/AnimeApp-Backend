import {Entity,OneToMany,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm";
import {Anime} from "./Anime";
import {identification} from "./Identification";

@Entity()
export class Genre extends identification{

    @OneToMany(type => Anime, anime =>anime.genre)
    anime: Anime[];
}
 