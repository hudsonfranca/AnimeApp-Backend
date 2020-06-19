import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    AfterLoad,
    AfterRemove,
} from 'typeorm';
import path from 'path';
import fs from 'fs';
import Anime from './Anime';

@Entity()
export default class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    url: string;

    @Column()
    path: string;

    @AfterLoad()
    setUrl(): void {
        this.url = `http://localhost:${process.env.PORT || 3000}/files/${
            this.path
        }`;
    }

    @AfterRemove()
    deleteImage(): void {
        const imagePath = `${path.resolve(
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
            fs.unlinkSync(imagePath);
        } catch (err) {
            console.log(err);
        }
    }

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
