import { Entity, Column, ManyToOne, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Episode } from "./Episode";
import { History} from "./History";

@Entity()
export class EpisodeToHistory {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public episodeId!: number;

    @Column()
    public historyId!: number;

    @Column()
    public date!: Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Episode, episode => episode.episodeToHistory,{
        onDelete:"CASCADE",
    })
    public episode!: Episode;

    @ManyToOne(type =>History, history => history.episodeToHistory,{
        onDelete:"CASCADE", 
    })
    public history!:History;
}