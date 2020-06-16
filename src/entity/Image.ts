import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import Anime from './Anime';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Anime, anime => anime.images, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    anime: Anime;
}
