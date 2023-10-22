import { Injectable, UnauthorizedException,Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        private jwtService:JwtService
        ){}

        //Sign Up Service
        async signup(signupDto:SignUpDto):Promise<{token:string}>{
            const {name,email,password} = signupDto;
            const hashedPassword = await bcrypt.hash(password,10);
            const user = await this.userModel.create({
                name,
                email,
                password:hashedPassword
            });

            const token = this.jwtService.sign({id:user._id});
            this.logger.log(`User ${name} with email ${email} signed up.`);
            return {token}
        }

        //Login Service
        async login(loginDto:LoginDto):Promise<{token:string}>{
            const {email,password} = loginDto;
            const user = await this.userModel.findOne({email});
            if(!user){
                throw new UnauthorizedException('Invalid email or Password!!')
            }

            const isMatchedPassword = await bcrypt.compare(password,user.password);
            if(!isMatchedPassword){
                throw new UnauthorizedException('Invalid email or Password!!')
            }
            const token = this.jwtService.sign({id:user._id});
            this.logger.log(`User ${user.name} with email ${email} logged in.`);
            return {token};
        }
        }
