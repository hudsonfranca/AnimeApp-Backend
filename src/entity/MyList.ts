import {Entity,JoinColumn,OneToMany,OneToOne,Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";
import {AnimesToMyList} from "./AnimesToMyList";
import {User} from "./User";

@Entity()
export class MyList {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    date: Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @OneToOne(type => User, user => user.myList,{onDelete:"CASCADE"}) 
    @JoinColumn()
    user: User;

    @OneToMany(type => AnimesToMyList, animesToMyList => animesToMyList.myList)
    public animesToMyList!: AnimesToMyList[];

}
