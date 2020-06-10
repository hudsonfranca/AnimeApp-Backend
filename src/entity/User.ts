import { MyList } from './MyList';
import {Entity,OneToOne,Column,OneToMany,JoinColumn} from "typeorm";
import {identification} from "./Identification";
import {Comment} from "./Comment";
import {History} from "./History";

@Entity()
export class User extends identification{

   @Column()
   email: string;

   @Column()
   password: string;

   @OneToMany(type => Comment, comment =>comment.user)
   comments: Comment[];

   @OneToOne(type => History, history => history.user) // specify inverse side as a second parameter
   history: History;

   @OneToOne(type => MyList, myList => myList.user) // specify inverse side as a second parameter
    myList: MyList;
}
