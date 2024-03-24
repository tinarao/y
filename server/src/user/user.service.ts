import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { SetCoverDTO, SubscriptionDTO } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel("user") private userModel: Model<User>) {}

    async getProfileInfoByID(id: string) {
        const userDetails = await this.userModel.findOne({ "username": id }).populate("tweets");

        if (!userDetails) {
            throw new NotFoundException({
                "message": "Указан неверный ID или пользователь не существует"
            })
        }

        const { password, ...data } = userDetails.toObject()

        return data
    }

    async setProfileCover(dto: SetCoverDTO) {
        const user = await this.userModel.findOneAndUpdate({ username: dto.username }, {
            background: dto.background
        })

        return user
    }

    async subscribe(dto: SubscriptionDTO) {
        const subscriber = await this.userModel.findOne({ username: dto.subscriber});
        const target = await this.userModel.findOne({ username: dto.target});

        subscriber.subscribedTo.push(target);
        target.subscribers.push(subscriber);

        subscriber.save()
        target.save()

        const { password, ...dataToReturn } = target.toObject()

        return dataToReturn
    }

    async unsubscribe(dto: SubscriptionDTO) {
        const subscriber = await this.userModel.findOne({ username: dto.subscriber});
        const target = await this.userModel.findOne({ username: dto.target});

        target.subscribers = target.subscribers.filter(i => i === subscriber);
        subscriber.subscribedTo = subscriber.subscribedTo.filter(i => i === target);

        await target.save()
        await subscriber.save()

        return { subscriber, target }
    }

}
