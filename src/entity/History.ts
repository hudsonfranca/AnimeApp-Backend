import {Entity,Column,PrimaryGeneratedColumn,OneToMany,JoinTable,ManyToMany,CreateDateColumn,UpdateDateColumn,OneToOne,JoinColumn} from "typeorm";
import {User} from "./User";
import {EpisodeToHistory} from "./EpisodeToHistory";

@Entity()
export class History{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    user_id:number;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    @OneToOne(type => User, user => user.history) 
    @JoinColumn()
    user: User;

    @OneToMany(type => EpisodeToHistory, episodeToHistory => episodeToHistory.history)
    public episodeToHistory!: EpisodeToHistory[];
}
