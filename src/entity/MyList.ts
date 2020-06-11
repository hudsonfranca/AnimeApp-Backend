import {
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import AnimesToMyList from './AnimesToMyList';
import Users from './User';

@Entity()
export default class MyList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => Users, user => user.myList, { onDelete: 'CASCADE' })
    @JoinColumn()
    user: Users;

    @OneToMany(type => AnimesToMyList, animesToMyList => animesToMyList.myList)
    public animesToMyList!: AnimesToMyList[];
}
