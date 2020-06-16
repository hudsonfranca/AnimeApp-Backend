import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import Anime from './Anime';
import MyList from './MyList';

@Entity()
export default class AnimesToMyList {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public animeId!: number;

    @Column()
    public myListId!: number;

    @Column()
    public date!: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Anime, anime => anime.animesToMyList, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public anime!: Anime;

    @ManyToOne(type => MyList, myList => myList.animesToMyList, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    public myList!: MyList;
}
