import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO, LoginDTO } from './dto/authDTO';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get("/")
    getUsers() {
        return this.authService.findAll()
    }

    @Post("/register")
    registerUser(@Body() dto: CreateUserDTO) {
        return this.authService.createUser(dto)
    }

    @Post("/login")
    login(@Body() dto: LoginDTO) {
        return this.authService.login(dto)
    }
}
