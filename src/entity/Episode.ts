import {Entity,Column,PrimaryGeneratedColumn,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne} from "typeorm";
import {Anime} from "./Anime";
import {Season} from "./Season";
import {Comment} from "./Comment";
import {EpisodeToHistory} from "./EpisodeToHistory";

@Entity()
export class Episode {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Anime, anime=> anime.images,{onDelete:"CASCADE"})
    anime: Anime;

    @ManyToOne(type => Season, season=> season.episodes,{onDelete:"CASCADE"})
    season: Season;

    @OneToMany(type => Comment,comment =>comment.episode)
    comments: Comment[];

    @OneToMany(type => EpisodeToHistory, episodeToHistory => episodeToHistory.episode)
    public episodeToHistory!: EpisodeToHistory[];

   
}