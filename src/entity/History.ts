import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import Users from './User';
import EpisodeToHistory from './EpisodeToHistory';

@Entity()
export default class History {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => Users, user => user.history, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: Users;

    @OneToMany(
        type => EpisodeToHistory,
        episodeToHistory => episodeToHistory.history,
    )
    public episodeToHistory!: EpisodeToHistory[];
}
