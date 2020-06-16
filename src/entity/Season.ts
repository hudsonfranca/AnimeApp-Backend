import { Entity, ManyToOne, OneToMany } from 'typeorm';
import Anime from './Anime';
import Episode from './Episode';
import identification from './identification';

@Entity()
export default class Season extends identification {
    @ManyToOne(type => Anime, anime => anime.season, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    anime: Anime;

    @OneToMany(type => Episode, episode => episode.season)
    episodes: Episode[];
}
