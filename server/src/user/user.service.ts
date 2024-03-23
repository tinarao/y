import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { editData } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel("user") private userModel: Model<User>) {}

    async getProfileInfoByID(id: string) {

        console.log(typeof id)

        const userDetails = await this.userModel.findOne({ "username": id }).populate("tweets");

        if (!userDetails) {
            throw new NotFoundException({
                "message": "Указан неверный ID или пользователь не существует"
            })
        }

        const { password, ...data } = userDetails.toObject()

        return data
    }

    async editProfileData(query: editData, username: string) {
        const user = await this.userModel.findOneAndUpdate({ username: username}, {
            fullName: query.fullName,
            profileInfo: query.profileInfo,
            links: query.links,
            background: query.background
        });

        return user
    }

}
