import { ObjectId } from "bson";
import { EUser } from "../entities/euser";
import { UserModel } from "../models/muser";


export class  UserRepository{
    public static async saveAsync(user: EUser){
        const res =  await UserModel.create(user);
        return res;
    } 

    public static async findAllAsync(){
        const res = await UserModel.find();
        return res;
    }

    public static async findByIdAsync(id: any){
        const res = await UserModel.findById(id).exec();
        return res;
    }

    public static async findOneAsync(params: any){
        const res = await UserModel.findOne(params);
        return res;
    }
    public static async UpdateAsync(id: ObjectId, params:any){
        const res = await UserModel.findById(id).update(params).exec();
        return res;
    }
}