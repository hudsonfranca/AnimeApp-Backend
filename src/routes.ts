import { Router,Request,Response } from 'express';
import {saveUser} from "./controller/UserController";

const routes = Router();

 routes.post('/user',saveUser);


routes.get('/', (req:Request,res:Response)=>{
    return res.json("Hello world 2!!")
});

export default routes;
