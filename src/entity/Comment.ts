import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Episode from './Episode';
import Users from './Users';

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Episode, episode => episode.comments, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    episode: Episode;

    @ManyToOne(type => Users, user => user.comments, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: Users;
}
