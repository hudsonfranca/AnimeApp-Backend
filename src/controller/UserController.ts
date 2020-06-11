import {Users} from "../entity/User";
import {getRepository} from "typeorm";
import {Request,Response} from "express";

export const saveUser = async (req:Request,res:Response)=>{
    const user = await getRepository(Users).save(req.body);
    return res.json(user);
}