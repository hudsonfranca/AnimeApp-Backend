import {Entity,ManyToOne,Column,OneToMany} from "typeorm";
import {Anime} from "./Anime";
import {Episode} from "./Episode";
import {identification} from "./Identification";

@Entity()
export class Season extends identification{

    @Column()
    anime_id: number;

    @ManyToOne(type => Anime, anime=> anime.season)
    anime: Anime;

    @OneToMany(type => Episode, episode =>episode.season)
    episodes: Episode[];
}
 