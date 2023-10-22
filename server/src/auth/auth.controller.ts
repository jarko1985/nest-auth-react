import { Body, Controller, Get, Post,Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(private authService:AuthService){}

    @Post('/signup')
    signup(@Body() signupDto:SignUpDto):Promise<{token:string}>{
        this.logger.log(`Received signup request with data: ${JSON.stringify(signupDto)}`);
        return this.authService.signup(signupDto)
    }

    @Post('/login')
    login(@Body() loginDto:LoginDto):Promise<{token:string}>{
        this.logger.log(`Received login request with data: ${JSON.stringify(loginDto)}`);
        return this.authService.login(loginDto)
    }
}
