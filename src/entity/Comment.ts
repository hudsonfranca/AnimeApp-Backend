import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Episode from './Episode';
import Users from './Users';
import Replie from './Replie';

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

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

    @OneToMany(type => Replie, replie => replie.comment)
    replie: Replie[];
}
