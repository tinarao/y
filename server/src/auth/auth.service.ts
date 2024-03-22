import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDTO, LoginDTO } from './dto/authDTO';

import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel("user") private userModel: Model<User>,
        private jwtService: JwtService
        ) {}

    async findAll() {
        return this.userModel.find().exec()
    }

    async createUser(dto: CreateUserDTO) {
        const isUserExists = await this.userModel.findOne({ email: dto.email})
        if (isUserExists) {
            throw new BadRequestException({
                message: "Пользователь с такими данными уже зарегистрирован"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(dto.password, salt)

        dto = {
            ...dto,
            password: passwordHash
        }

        return await this.userModel.create(dto);
    }

    async login(dto: LoginDTO) {
        const candidate = await this.userModel.findOne({ email: dto.email })
        if (!candidate) {
            throw new NotFoundException({
                "message": "Пользователь с такими данными не существует"
            })
        }

        const isPasswordMatches = await bcrypt.compare(dto.password, candidate.password)
        if (!isPasswordMatches) {
            throw new BadRequestException({
                "message": "Неправильные данные для входа"
            })
        }

        return {
            access_token: await this.jwtService.signAsync({
                id: candidate._id,
                username: candidate.username
            }),
            user: {
                username: candidate.username,
                _id: candidate._id,
                role: candidate.role,
                avatar: candidate.avatar,
                email: candidate.email,
                profileInfo: candidate.profileInfo,
                links: candidate.links,
                fullName: candidate.fullName
            }
        }

    }

}
