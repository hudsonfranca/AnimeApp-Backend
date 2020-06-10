import {Column,Entity,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToOne} from "typeorm";
import {Anime} from "./Anime";


@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Anime, anime=> anime.images,{onDelete:"CASCADE"})
    anime: Anime;

   
}