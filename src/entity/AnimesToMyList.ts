import { Entity, Column, ManyToOne, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";
import { Anime } from "./Anime";
import { MyList} from "./MyList";

@Entity()
export class AnimesToMyList {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public anime_id!: number;

    @Column()
    public myList_id!: number;

    @Column()
    public date!: Date;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Anime,anime => anime.animesToMyList)
    public anime!: Anime;

    @ManyToOne(type => MyList, myList => myList.animesToMyList)
    public myList!:MyList;
}