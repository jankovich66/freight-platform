import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SingUpDto } from './dto/signUp.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<User> {
        return this.authService.validateUser(loginDto);
    }

    @Post('register')
    register(@Body() signUpDto: SingUpDto): Promise<User> {
        return this.authService.signUp(signUpDto.email, signUpDto.password, signUpDto.phoneNumber, signUpDto.role);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req);
        return req.user;
    }
}
