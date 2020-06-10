import {Entity,ManyToOne,Column,OneToMany} from "typeorm";
import {Anime} from "./Anime";
import {Episode} from "./Episode";
import {identification} from "./Identification";

@Entity()
export class Season extends identification{


    @ManyToOne(type => Anime, anime=> anime.season,{onDelete:"CASCADE"})
    anime: Anime;

    @OneToMany(type => Episode, episode =>episode.season)
    episodes: Episode[];
}
 