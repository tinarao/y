import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { EditProfileDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
        ) {}

    @Get("/:id")
    getUserInfoByID(@Param() id: string) {
        return this.userService.getProfileInfoByID(id)
    }

    @Patch("/edit")
    editUserProfileInfo(@Body() dto: EditProfileDTO) {
        return this.userService.editProfileData(dto)
    }

}
