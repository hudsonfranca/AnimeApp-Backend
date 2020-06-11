import {
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import MyList from './MyList';
import Comment from './Comment';
import History from './History';

@Entity()
export default class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @OneToOne(type => History, history => history.user)
    history: History;

    @OneToOne(type => MyList, myList => myList.user)
    myList: MyList;
}
