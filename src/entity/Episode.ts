import { History } from './History';
import {Column,PrimaryGeneratedColumn,CreateDateColumn,OneToMany,UpdateDateColumn,ManyToOne,ManyToMany} from "typeorm";
import {Anime} from "./Anime";
import {Season} from "./Season";
import {Comment} from "./Comment";
import {EpisodeToHistory} from "./EpisodeToHistory";

export class Episode {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url: string;

    @Column()
    anime_id:number;

    @Column()
    season_id:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Anime, anime=> anime.images)
    anime: Anime;

    @ManyToOne(type => Season, season=> season.episodes)
    season: Season;

    @OneToMany(type => Comment,comment =>comment.episode)
    comments: Comment[];

    @OneToMany(type => EpisodeToHistory, episodeToHistory => episodeToHistory.episode)
    public episodeToHistory!: EpisodeToHistory[];

   
}