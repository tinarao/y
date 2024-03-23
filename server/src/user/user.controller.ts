import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { editData } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
        ) {}

    @Get("/info/:id")
    getUserInfoByID(@Param("id") id: string) {
        return this.userService.getProfileInfoByID(id)
    }

    @Patch("/edit/:username")
    editUserProfileInfo(@Query() query: editData, @Param("username") username: string) {
        return this.userService.editProfileData(query, username)
    }

}
