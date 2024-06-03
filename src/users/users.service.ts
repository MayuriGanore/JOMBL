/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import {User,UserDocument} from "./schemas/user.schemas";
@Injectable()
export class UsersService {
    private readonly JWT_SECRET = 'MayuriGanore@24//';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(
        @InjectModel(User.name)
        private userModel:Model<UserDocument>
    ){}

    async register(email:string,password:string):Promise<User>
    {
        const UserExists=await this.userModel.findOne({email});
        if(UserExists)
            throw new Error("Email Address Already In Use");

        const HashedPassword=await bcrypt.hash(password,10);
        const user=new this.userModel({email,password:HashedPassword});
        return user.save();
    }  
    async login(email:string,password:string):Promise<string>
    {
        const user=await this.userModel.findOne({email});
        if(!email)
        {
            throw Error("User Not Found!!");
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            throw Error ("Password Not Valid!!");
        }
        const token=jwt.sign({email:user.email},'MayuriGanore@24//',{expiresIn:"1h"});
        return token;
    }
    validateToken(token: string): boolean {
        try {
            jwt.verify(token, this.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}
