import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel("user") private userModel: Model<User>) {}

    async getProfileInfoByID(id: string) {
        const _id = new mongoose.Types.ObjectId(id);
        const userDetails = await this.userModel.findOne({ _id: _id}).populate("tweets");
        // .populate("array of object id's")
        if (!userDetails) {
            throw new NotFoundException({
                "message": "Указан неверный ID или пользователь не существует"
            })
        }

        const { password, ...data } = userDetails.toObject()

        return data
    }

}
