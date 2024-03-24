import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { SetCoverDTO, SubscriptionDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
        ) {}

    @Get("/info/:id")
    getUserInfoByID(@Param("id") id: string) {
        return this.userService.getProfileInfoByID(id)
    }

    @Patch("/upd-cover/:username")
    editUserProfileInfo(@Body() dto: SetCoverDTO) {
        return this.userService.setProfileCover(dto)
    }

    @Patch("/subscribe")
    subscribeHandler(@Body() dto: SubscriptionDTO) {
        return this.userService.subscribe(dto)
    }

    @Patch("/unsubscribe")
    unsubscribeHandler(@Body() dto: SubscriptionDTO) {
        return this.userService.unsubscribe(dto)
    }

}
