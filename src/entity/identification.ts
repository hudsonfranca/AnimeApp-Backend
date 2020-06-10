import {Column,PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm";


export class identification {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

}