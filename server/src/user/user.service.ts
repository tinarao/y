import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { EditProfileDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel("user") private userModel: Model<User>) {}

    async getProfileInfoByID(id: string) {
        const _id = new mongoose.Types.ObjectId(id);
        const userDetails = await this.userModel.findOne({ _id: _id}).populate("tweets");

        if (!userDetails) {
            throw new NotFoundException({
                "message": "Указан неверный ID или пользователь не существует"
            })
        }

        const { password, ...data } = userDetails.toObject()

        return data
    }

    async editProfileData(dto: EditProfileDTO) {
        const user = await this.userModel.findById(dto.user)

        user.profileInfo = dto.data.profileInfo || user.profileInfo
        user.fullName = dto.data.fullName || user.fullName
        user.links = [...user.links, dto.data.links]

        user.save()

        return user
    }

}
