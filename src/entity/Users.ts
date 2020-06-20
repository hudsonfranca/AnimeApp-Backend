import {
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
import MyList from './MyList';
import Comment from './Comment';
import History from './History';
import Replie from './Replie';

@Entity()
export default class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    setHashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @BeforeUpdate()
    setHashPasswordUpdate(): void {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    @OneToMany(type => Replie, replie => replie.user)
    replie: Replie[];

    @OneToOne(type => History, history => history.user)
    history: History;

    @OneToOne(type => MyList, myList => myList.user)
    myList: MyList;
}
