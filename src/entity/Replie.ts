import {
    Entity,
    ManyToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Comment from './Comment';
import Users from './Users';

@Entity()
export default class Replie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Comment, comment => comment.replie, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    comment: Comment;

    @ManyToOne(type => Users, user => user.replie, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    user: Users;
}
