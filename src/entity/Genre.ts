import { Entity, OneToMany } from 'typeorm';
import Anime from './Anime';
import identification from './identification';

@Entity()
export default class Genre extends identification {
    @OneToMany(type => Anime, anime => anime.genre)
    anime: Anime[];
}
