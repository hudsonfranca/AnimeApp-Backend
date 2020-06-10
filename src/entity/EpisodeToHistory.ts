import { Entity, Column, ManyToOne, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Episode } from "./Episode";
import { History} from "./History";

@Entity()
export class EpisodeToHistory {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public episode_id!: number;

    @Column()
    public hisroty_id!: number;

    @Column()
    public date!: Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Episode, episode => episode.episodeToHistory)
    public episode!: Episode;

    @ManyToOne(type =>History, history => history.episodeToHistory)
    public history!:History;
}