import {Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToOne} from "typeorm";
import {Anime} from "./Anime";


export class Image {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url: string;

    @Column()
    anime_id:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @ManyToOne(type => Anime, anime=> anime.images)
    anime: Anime;

   
}