import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToMany,
    UpdateDateColumn,
    ManyToOne,
    AfterLoad,
    AfterRemove,
    OneToOne,
} from 'typeorm';
import path from 'path';
import fs from 'fs';
import Anime from './Anime';
import Season from './Season';
import Comment from './Comment';
import EpisodeToHistory from './EpisodeToHistory';
import Thumbnail from './Thumbnail';

@Entity()
export default class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    url: string;

    @Column()
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @AfterLoad()
    setUrl(): void {
        this.url = `http://localhost:${process.env.PORT || 3000}/files/${
            this.path
        }`;
    }

    @AfterRemove()
    deleteEpisode(): void {
        const episodePath = `${path.resolve(
            __dirname,
            '..',
            '..',
            '.',
            'temp',
            '.',
            'uploads',
            `${this.path}`,
        )}`;
        try {
            fs.unlinkSync(episodePath);
        } catch (err) {
            console.log(err);
        }
    }

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => Anime, anime => anime.images, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    anime: Anime;

    @ManyToOne(type => Season, season => season.episodes, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    season: Season;

    @OneToMany(type => Comment, comment => comment.episode)
    comments: Comment[];

    @OneToMany(
        type => EpisodeToHistory,
        episodeToHistory => episodeToHistory.episode,
    )
    public episodeToHistory!: EpisodeToHistory[];

    @OneToOne(type => Thumbnail, thumbnail => thumbnail.episode) // specify inverse side as a second parameter
    thumbnail: Thumbnail;
}
