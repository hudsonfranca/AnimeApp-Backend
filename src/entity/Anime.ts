import {Column,OneToMany,ManyToOne,Entity} from "typeorm";
import {Genre} from "./Genre";
import {Season} from "./Season"
import {Image} from "./Image"
import {Episode} from "./Episode"
import {identification} from "./Identification"
import {AnimesToMyList} from "./AnimesToMyList";


@Entity()
export class Anime extends identification{

    @Column()
    episode:number;

    @Column()
    date:Date;

    @Column({length:2000})
    description:string;

    @ManyToOne(type => Genre, genre=> genre.anime)
    genre: Genre;

    @OneToMany(type => Season, season =>season.anime)
    season: Season[];

    @OneToMany(type => Image, image =>image.anime)
    images: Image[];

    @OneToMany(type => Episode, episode =>episode.anime)
    episodes: Episode[];

    @OneToMany(type => AnimesToMyList,  animesToMyList =>  animesToMyList.anime)
    public  animesToMyList!:  AnimesToMyList[];
}