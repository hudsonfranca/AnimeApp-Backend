import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    OneToOne,
    UpdateDateColumn,
    AfterLoad,
    AfterRemove,
    JoinColumn,
} from 'typeorm';
import path from 'path';
import fs from 'fs';
import Episode from './Episode';

@Entity()
export default class Thumbnail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    url: string;

    @CreateDateColumn()
    createdAt: Date;

    @AfterLoad()
    setUrl(): void {
        this.url = `http://localhost:${
            process.env.PORT || 3000
        }/files/thumbnails/${this.name}`;
    }

    @AfterRemove()
    deleteThumbnail(): void {
        const previewPath = `${path.resolve(
            __dirname,
            '..',
            '..',
            '.',
            'temp',
            '.',
            'uploads',
            '.',
            'thumbnails',
            `${this.name}`,
        )}`;
        try {
            fs.unlinkSync(previewPath);
        } catch (err) {
            console.log(err);
        }
    }

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(type => Episode, episode => episode.thumbnail, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn()
    episode: Episode;
}
