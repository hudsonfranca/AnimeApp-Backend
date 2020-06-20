import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Episode from './Episode';
import History from './History';

@Entity()
export default class EpisodeToHistory {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public episodeId!: number;

    @Column()
    public historyId!: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Episode, episode => episode.episodeToHistory, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public episode!: Episode;

    @ManyToOne(type => History, history => history.episodeToHistory, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public history!: History;
}
