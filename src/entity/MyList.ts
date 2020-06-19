import {
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import AnimesToMyList from './AnimesToMyList';
import Users from './Users';

@Entity()
export default class MyList {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => Users, user => user.myList, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    user: Users;

    @OneToMany(type => AnimesToMyList, animesToMyList => animesToMyList.myList)
    public animesToMyList!: AnimesToMyList[];
}
